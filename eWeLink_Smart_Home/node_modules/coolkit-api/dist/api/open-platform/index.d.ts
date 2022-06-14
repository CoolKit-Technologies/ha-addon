export declare const openPlatform: {
    getAuthInfo(): Promise<{
        error: number;
        msg: string;
        data: {
            personal?: {
                name?: string;
                email?: string;
                phoneNumber?: string;
                identifyNumber?: string;
                job: string;
            };
            company?: {
                name: string;
                email: string;
                phoneNumber?: string;
                companyName?: string;
                unifiedSocialCreditCode?: string;
                legalPersonName?: string;
                companyType?: string;
                officialWebsite?: string;
                companyBusinessInsights: string;
                address: string;
                businessLicenseKeys?: {
                    url: string;
                    key: string;
                }[];
                postalCode?: string;
                fax?: string;
            };
            status: string;
            reason?: string;
        };
    }>;
    applyAuth(params: {
        personal?: {
            name?: string;
            email?: string;
            phoneNumber?: string;
            identifyNumber?: string;
            job: string;
        };
        company?: {
            name: string;
            email: string;
            phoneNumber?: string;
            companyName: string;
            unifiedSocialCreditCode?: string;
            legalPersonName?: string;
            companyType?: string;
            officialWebsite?: string;
            companyBusinessInsights: string;
            address: string;
            businessLicenseKeys?: string[];
            postalCode?: string;
            fax?: string;
        };
    }): Promise<import("..").ApiResponse>;
    createApp(params: {
        name: string;
        description: string;
        redirectURL: string;
    }): Promise<{
        error: number;
        msg: string;
        data: {
            appid: string;
            appSecret: string;
        };
    }>;
    removeApp(params: {
        appid: string;
    }): Promise<import("..").ApiResponse>;
    updateApp(params: {
        appid: string;
        name: string;
        description: string;
        redirectURL: string;
    }): Promise<import("..").ApiResponse>;
    getAppList(): Promise<{
        error: number;
        msg: string;
        data: {
            applicationList: Array<{
                appid: string;
                appSecret: string;
                name: string;
                description: string;
                redirectURL: string;
                createdAt: string;
                expiredAt: string;
            }>;
            creatingList?: string[];
        };
    }>;
};
