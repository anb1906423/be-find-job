const emailServieces = require('./emailServieces');
const ungTuyenModel = require('../model/ungTuyen');

class ungTuyenServices {
    SendDataApplyNhaTuyenDung(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.idUngVien ||
                    !data.idNhaTuyenDung ||
                    !data.time ||
                    !data.emailNhaTuyenDung ||
                    !data.emailUngVien ||
                    !data.hoVaTen ||
                    !data.diaChi ||
                    !data.soDienThoai ||
                    !data.tenCongty ||
                    !data.tenJob ||
                    !data.idJobPost
                ) {
                    return resolve({
                        errCode: 1,
                        msg: 'missing required parameters',
                    });
                }

                const checkExists = await ungTuyenModel
                    .findOne({
                        idUngVien: data.idUngVien,
                        idJobPost: data.idJobPost,
                    })
                    .exec();

                if (checkExists) {
                    await ungTuyenModel
                        .deleteOne({
                            idUngVien: data.idUngVien,
                            idJobPost: data.idJobPost,
                        })
                        .exec();
                }

                await emailServieces.sendEmailToNhaTuyenDung(data);

                const dataAwait = await ungTuyenModel.create({
                    idUngVien: data.idUngVien,
                    idNhaTuyenDung: data.idNhaTuyenDung,
                    idJobPost: data.idJobPost,
                    time: data.time,
                    emailNhaTuyenDung: data.emailNhaTuyenDung,
                    emailUngVien: data.emailUngVien,
                    soDienThoai: data.soDienThoai,
                    isNotify: true,
                    isNew: true,
                    tenCongty: data.tenCongty,
                    tenJob: data.tenJob,
                });

                resolve({
                    errCode: 0,
                    msg: 'Successfully apply to the Nha Tuyen Dung!',
                    data: dataAwait,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async GetLimitUngVienUngTuyen(page, limit, idQuery, type, queryType) {
        return new Promise(async (resolve, reject) => {
            if (!idQuery) {
                return reject('Missing required parameter idNhaTuyenDung');
            }

            const options = {
                limit: limit || 1,
                page: page || 1,
            };

            const whereType = queryType || 'idNhaTuyenDung';

            try {
                const { docs, prevPage, nextPage, ...pagination } = await ungTuyenModel.paginate(
                    {
                        [whereType]: idQuery,
                        isDeleted: type ? type : false,
                    },
                    options,
                );

                const data = {
                    errCode: 0,
                    data: docs,
                    meta: {
                        nextPage,
                        prevPage,
                        ...pagination,
                    },
                };

                if (!docs.length) {
                    data.meta.msgEr = 'No documentation find available';
                }

                if (!limit) {
                    data.meta.limitWarning = 'missing limit parameter send api';
                }

                if (!page) {
                    data.meta.pageWarning = 'missing page parameter send api';
                }

                if (nextPage) {
                    data.meta.nextPageUrl = `/api/v1/ung-tuyen/get-all-limit-ung-vien-ung-tuyen?page=${nextPage}&limit=${
                        limit ? limit : options.limit
                    }`;
                }

                if (prevPage) {
                    data.meta.prevPageUrl = `/api/v1/ung-tuyen/get-all-limit-ung-vien-ung-tuyen?page=${prevPage}&limit=${
                        limit ? limit : options.limit
                    }`;
                }

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    async PostCheckIsNew(id, time_Appointment, type) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameter',
                    });
                }

                if (!time_Appointment) {
                    time_Appointment = '';
                }

                const checkExists = await ungTuyenModel
                    .findOne({
                        _id: id,
                    })
                    .exec();

                if (checkExists) {
                    if (!time_Appointment) {
                        await ungTuyenModel.findByIdAndUpdate(id, {
                            isNew: false,
                            // isConfirmedNTD: false,
                        });
                    }

                    if (type === 'book') {
                        await ungTuyenModel.findByIdAndUpdate(id, {
                            isNew: false,
                            time_Appointment,
                            isConfirmedNTD: true,
                        });
                    }

                    if (type === 'cancel') {
                        await ungTuyenModel.findByIdAndUpdate(id, {
                            isNew: false,
                            time_Appointment,
                            isConfirmedNTD: true,
                        });
                    }

                    const data = await ungTuyenModel
                        .findOne({
                            _id: id,
                        })
                        .exec();

                    resolve({
                        errCode: 0,
                        msg: 'Success fully',
                        data: data,
                    });
                } else {
                    resolve({
                        errCode: 404,
                        msg: 'Ung Tuyen Not Found',
                        data: null,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async TrashungVienUngVienUngTuyen(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.id) {
                    return resolve({
                        errCode: 1,
                        msg: 'Missing required parameters',
                    });
                }

                const checkExists = await ungTuyenModel
                    .findOne({
                        _id: data.id,
                    })
                    .exec();

                if (checkExists) {
                    await ungTuyenModel.findByIdAndUpdate(data.id, {
                        isDeleted: data.type,
                    });

                    const dataAwait = await ungTuyenModel
                        .findOne({
                            _id: data.id,
                        })
                        .exec();

                    resolve({
                        errCode: 0,
                        msg: 'Updated Successfully',
                        data: dataAwait,
                    });
                } else {
                    resolve({
                        errCode: 404,
                        msg: 'Ung Tuyen Not Found',
                        data: null,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    async ChangeTimeAppointment(data, isConfirmedNTD = false, type = 'ung-vien') {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.time_Appointment || !data.id) {
                    resolve({
                        errCode: 1,
                        msg: 'Missing required parameters',
                    });
                }

                const checkExists = await ungTuyenModel
                    .findOne({
                        _id: data.id,
                    })
                    .exec();

                if (checkExists) {
                    if (type === 'ung-vien') {
                        await ungTuyenModel.findByIdAndUpdate(data.id, {
                            time_again_Appointment: data.time_Appointment,
                            isConfirmedNTD: false,
                        });
                    } else {
                        await ungTuyenModel.findByIdAndUpdate(data.id, {
                            time_Appointment: data.time_Appointment,
                            isConfirmedNTD,
                        });
                    }

                    const dataAwait = await ungTuyenModel
                        .findOne({
                            _id: data.id,
                        })
                        .exec();

                    resolve({
                        errCode: 0,
                        msg: 'Updated Successfully',
                        data: dataAwait,
                    });
                } else {
                    resolve({
                        errCode: 404,
                        msg: 'Ung Tuyen Not Found',
                        data: null,
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new ungTuyenServices();
