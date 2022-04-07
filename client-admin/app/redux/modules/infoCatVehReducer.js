import * as types from '../constants/infoCatVehTypes';

const initialState = {
    categories: null,
    families: null,
    catsAllApi: null,
    famsAllApi: null,
    catsApi: null,
    famsApi: null,
    loadingCats: false,
    loadingFams: false,
    loadingVeh: false,
    display: 'normal',
    filter: 'cars',
    filterFams: 'cars',
    currentSearch: '',
    current: null,
    error: null
};

const get = (item, name) => {

    let value = null;

    Object.keys(item).forEach((key) => {
        if (key == name) {
            value = item[key];
        }
    });

    return value;

}

const compare = (type, val1, val2) => {

    if (type === "asc") {

        if (val1 > val2) {
            return true;
        } else {
            return false;
        }

    } else {
        if (val1 < val2) {
            return true;
        } else {
            return false;
        }
    }

}

const Filtring = (data, display, filter) => {

    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (compare(display, get(data[i], filter), get(data[j], filter))) {
                let del = data[i];
                data[i] = data[j];
                data[j] = del;
            }
        }
    }


    return data;
}


export default (state = initialState, action) => {
    switch (action.type) {


        case types.GET_ALL_CATSVEH:

            let catsAllData = [];

            action.payload.categories.forEach(elm => {

                let obj = {};

                obj.brand = elm.brand;
                obj.cars = elm.cars;
                obj.family = elm.family;
                obj.years = elm.years;
                obj.km = elm.km;
                obj.gasoline = elm.gasoline;
                obj.diesel = elm.diesel;
                obj.colors = elm.colors;

                obj.edited = false;
                obj.display = true;

                catsAllData.push(obj);

            });

            return {
                ...state,
                categories: action.payload.categories,
                catsApi: catsAllData,
                catsAllApi: catsAllData,
                loadingCats: false,
            };


        case types.GET_ALL_FAMSVEH:

            let famsAllData = [];

            action.payload.families.forEach(elm => {

                let obj = {};

                obj.brand = elm.brand;
                obj.name = elm.name;
                obj.cars = elm.cars;
                obj.years = elm.years;
                obj.km = elm.km;
                obj.gasoline = elm.gasoline;
                obj.diesel = elm.diesel;
                obj.colors = elm.colors;

                obj.edited = false;
                obj.display = true;

                famsAllData.push(obj);

            });

            return {
                ...state,
                families: action.payload.families,
                famsApi: famsAllData,
                famsAllApi: famsAllData,
                loadingFams: false,
            };

        case types.SET_CURRENT_VEH:

            return {
                ...state,
                loadingVeh: false,
                current: action.payload.vehicle,
                error: null,
            };

        case types.CATSVEH_LOADING:

            return {
                ...state,
                loadingCats: true,
                error: null,
            };

        case types.FAMSVEH_LOADING:

            return {
                ...state,
                loadingFams: true,
                error: null,
            };

        case types.ONEVEH_LOADING:

            return {
                ...state,
                loadingVeh: true,
                error: null,
            };

        case types.CATSVEH_ERROR:

            return {
                ...state,
                loadingCats: false,
                error: action.payload,
            };


        // Filtring Vehicles

        case types.FILTRING_DISPLAY_CATSVEH:

            let filtred = [], currentDataApi = [];

            state.catsAllApi.forEach(elm => {
                if (elm.brand.toLowerCase().includes(state.currentSearch.toLowerCase())) {
                    currentDataApi.push(elm);
                }
            })

            if (action.payload === 'normal') {
                filtred = currentDataApi;
            } else {
                filtred = Filtring(currentDataApi, action.payload, state.filter);
            }

            return {
                ...state,
                display: action.payload,
                catsApi: filtred,
            };

        case types.FILTRING_DISPLAY_FAMSVEH:

            let filtredFams = [], currentDataApiFams = [];

            state.famsAllApi.forEach(elm => {
                if (elm.name.toLowerCase().includes(state.currentSearch.toLowerCase())) {
                    currentDataApiFams.push(elm);
                }
            })

            if (action.payload === 'normal') {
                filtredFams = currentDataApiFams;
            } else {
                filtredFams = Filtring(currentDataApiFams, action.payload, state.filterFams);
            }

            return {
                ...state,
                display: action.payload,
                famsApi: filtredFams,
            };


        case types.FILTRING_CATSVEH:

            let filtred1 = [], currentDataApi1 = [];

            state.catsApi.forEach(elm => {
                currentDataApi1.push(elm);
            })

            if (state.display !== 'normal') {
                filtred1 = Filtring(currentDataApi1, state.display, action.payload);
            } else {
                filtred1 = state.catsAllApi;
            }

            return {
                ...state,
                filter: action.payload,
                catsApi: filtred1,
            };

        case types.FILTRING_FAMSVEH:

            let filtredFams1 = [], currentDataApiFams1 = [];

            state.famsApi.forEach(elm => {
                currentDataApiFams1.push(elm);
            })

            if (state.display !== 'normal') {
                filtredFams1 = Filtring(currentDataApiFams1, state.display, action.payload);
            } else {
                filtredFams1 = state.famsAllApi;
            }

            return {
                ...state,
                filterFams: action.payload,
                famsApi: filtredFams1,
            };


        case types.SEARCH_CATSVEH:


            let currentSearchCatsData = [], currentDataApi2 = [];

            if (!state.catsApi || !state.catsAllApi) {
                return {
                    ...state,
                };
            }

            state.catsAllApi.forEach(elm => {
                currentDataApi2.push(elm);
            })


            if (action.payload === '' && state.display === 'normal') {
                currentSearchCatsData = currentDataApi2;
            } else if (action.payload === '') {
                currentSearchCatsData = Filtring(currentDataApi2, state.display, state.filter);
            } else {
                currentDataApi2.forEach(elm => {
                    if (elm.brand.toLowerCase().includes(action.payload.toLowerCase())) {
                        currentSearchCatsData.push(elm);
                    }
                })

                if (state.display !== 'normal') {
                    currentSearchCatsData = Filtring(currentSearchCatsData, state.display, state.filter);
                }
            }


            return {
                ...state,
                currentSearch: action.payload,
                catsApi: currentSearchCatsData,

            };

        case types.SEARCH_FAMSVEH:


            let currentSearchFamsData = [], currentDataApiFams2 = [];

            if (!state.famsApi || !state.famsAllApi) {
                return {
                    ...state,
                };
            }

            state.famsAllApi.forEach(elm => {
                currentDataApiFams2.push(elm);
            })


            if (action.payload === '' && state.display === 'normal') {
                currentSearchFamsData = currentDataApiFams2;
            } else if (action.payload === '') {
                currentSearchFamsData = Filtring(currentDataApiFams2, state.display, state.filter);
            } else {
                currentDataApiFams2.forEach(elm => {
                    if (elm.name.toLowerCase().includes(action.payload.toLowerCase())) {
                        currentSearchFamsData.push(elm);
                    }
                })

                if (state.display !== 'normal') {
                    currentSearchFamsData = Filtring(currentSearchFamsData, state.display, state.filter);
                }
            }


            return {
                ...state,
                currentSearch: action.payload,
                famsApi: currentSearchFamsData,

            };



        default:
            return state;
    }
}