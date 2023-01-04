import React from "react";
import {CustomView, isMobileOnly, MobileOnlyView} from "react-device-detect";
import {Outlet} from "react-router-dom";

export class Console extends React.Component<any, any> {

    render() {
        return (
            <div>
                <CustomView condition={!isMobileOnly}>
                    <div>
                        <Outlet />
                    </div>
                </CustomView>
                <MobileOnlyView>
                    <div>
                        <Outlet />
                    </div>
                </MobileOnlyView>
            </div>
        );
    }

}
