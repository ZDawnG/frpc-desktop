import Datastore from "nedb";
import path from "path";
import {app} from "electron";

const log = require('electron-log');

const configDB = new Datastore({
    autoload: true,
    filename: path.join(app.getPath("userData"), "config.db")
});

export type Config = {
    currentVersion: any;
    serverAddr: string;
    serverPort: number;
    authMethod: string;
    authToken: string;
    logLevel: string;
    logMaxDays: number;
    tlsConfigEnable: boolean;
    tlsConfigCertFile: string;
    tlsConfigKeyFile: string;
    tlsConfigTrustedCaFile: string;
    tlsConfigServerName: string;
    proxyConfigEnable: boolean;
    proxyConfigProxyUrl: string;
    systemSelfStart: boolean;
    systemStartupConnect: boolean;
    user: string;
    metaToken: string;
    transportHeartbeatInterval: number;
    transportHeartbeatTimeout: number;
};

/**
 * 保存
 */
export const saveConfig = (
    document: Config,
    cb?: (err: Error | null, numberOfUpdated: number, upsert: boolean) => void
) => {
    document["_id"] = "1";
    log.debug(`保存日志 ${JSON.stringify(document)}`)
    configDB.update({_id: "1"}, document, {upsert: true}, cb);
};

/**
 * 查找
 * @param cb
 */
export const getConfig = (
    cb: (err: Error | null, document: Config) => void
) => {
    configDB.findOne({_id: "1"}, cb);
};
