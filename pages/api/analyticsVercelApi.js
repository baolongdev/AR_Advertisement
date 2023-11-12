import axiosClient from "./axiosClient"

class AnalyticsVercelApi {
    vercelToken = "Bearer CjeMvx9Rgv3VVp9TamJy337o";
    getOverviewAndTimeseries(url, params) {
        return axiosClient.get(url, {
            baseURL: "https://vercel.com/api/web/insights",
            headers: {
                "Authorization": this.vercelToken,
            },
            params,
        });
    }
    getStats(url, params) {
        return axiosClient.get(url, {
            baseURL: "https://vercel.com/api/web/insights/stats",
            headers: {
                "Authorization": this.vercelToken,
            },
            params,
        });
    }

    getAll(params) {
        return {
            "overview": this.getOverviewAndTimeseries('overview', params),
            "timeseries": this.getOverviewAndTimeseries('timeseries', params),
            "path": this.getStats('/path', params),
            "referrer": this.getStats('/referrer', params),
            "country": this.getStats('/country', params),
            "os_name": this.getStats('/os_name', params),
            "client_name": this.getStats('/client_name', params),
        }
    }
}

const analyticsVercelApi = new AnalyticsVercelApi();
export default analyticsVercelApi;