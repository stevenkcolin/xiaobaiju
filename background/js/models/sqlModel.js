/**
 * Created by Pengfei on 2016/1/26.
 */

module.exports = function (db, models) {
    models.reportInfo = db.define('REPORT_INFO', {
        id: {type: 'serial', key: true},
        userId: {type: 'text', mapsTo: 'USER_ID'},
        localId: {type: 'text', mapsTo: 'LOCAL_ID'},
        appType: {type: 'integer', mapsTo: 'APP_TYPE'},
        appVer: {type: 'text', mapsTo: 'APP_VER'},
        ip: {type: 'text', mapsTo: 'IP'},
        channelId: {type: 'text', mapsTo: 'CHANNEL_ID'},
        deviceType: {type: 'text', mapsTo: 'DEVICE_TYPE'},
        deviceModel: {type: 'text', mapsTo: 'DEVICE_MODEL'},
        netType: {type: 'text', mapsTo: 'NET_TYPE'},
        carrier: {type: 'text', mapsTo: 'CARRIER'},
        os: {type: 'text', mapsTo: 'OS'},
        actionTime: {type: 'date', mapsTo: 'ACTION_TIME'},
        actionCode: {type: 'integer', mapsTo: 'ACTION_CODE'},
        actionParam1: {type: 'text', mapsTo: 'ACTION_PARAM1'},
        actionParam2: {type: 'text', mapsTo: 'ACTION_PARAM2'},
        actionParam3: {type: 'text', mapsTo: 'ACTION_PARAM3'},
        longitude: {type: 'text', mapsTo: 'LONGITUDE'},
        latitude: {type: 'text', mapsTo: 'LATITUDE'}
    });

    models.db = db;
};