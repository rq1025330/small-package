"use strict";

import { port_array, stream_settings } from "../common/stream.mjs";

export function vmess_outbound(server, tag) {
    const stream_settings_object = stream_settings(server, "vmess", tag);
    const stream_settings_result = stream_settings_object["stream_settings"];
    const dialer_proxy = stream_settings_object["dialer_proxy"];
    return {
        outbound: {
            protocol: "vmess",
            tag: tag,
            settings: {
                vnext: map(port_array(server["server_port"]), function (v) {
                    return {
                        address: server["server"],
                        port: v,
                        users: [
                            {
                                email: server["username"],
                                id: server["password"],
                                alterId: int(server["alter_id"]),
                                security: server["vmess_security"]
                            }
                        ]
                    };
                })
            },
            streamSettings: stream_settings_result
        },
        dialer_proxy: dialer_proxy
    };
};
