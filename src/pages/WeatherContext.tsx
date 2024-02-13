export interface HourWeatherResponse {
    weather: [
        {
            main: string;
            description: string;
        }
    ];
    wind: {
        speed: number;
    };
    main: {
        temp: number;
    };
    dt: number;
    city: string;
}

export interface ForecastWeatherResponse {
    list: [
        {
            main: {
                temp: number;
            };
            wind: {
                speed: number;
            };
            weather: [
                {
                    main: string;
                    description: string;
                }
            ];
            dt_txt: string;
            city: string;
        }
    ];
}