import * as types from '../constants/infotypes';

const initialState = {
    users: null,
    blocked: null,
    usersApi: null,
    blockedApi: null,
    usersAllApi: null,
    blockedAllApi: null,
    loadingUsers: false,
    currentSearch: '',
    currentBlockedSearch: '',
    error: null
};



export default (state = initialState, action) => {
    switch (action.type) {

        case types.GET_ALL_USERS:

            let usersAllData = [];
            let blockedAllData = [];

            action.payload.users.forEach(elm => {

                let obj = {};
                let date = new Date(elm.createdAt);
                let Usersformat = date.toLocaleString('default', { month: 'short', year: 'numeric' });

                obj.users = elm.photo;
                obj.id = elm._id;
                obj.email = elm.email;
                obj.lastname = elm.lastname;
                obj.firstname = elm.firstname;
                obj.role = elm.role;
                obj.createdAt = Usersformat;
                obj.edited = false;
                obj.display = true;

                usersAllData.push(obj);

            });

            action.payload.blocked.forEach(elm => {

                let obj = {};
                let date = new Date(elm.createdAt);
                let Usersformat = date.toLocaleString('default', { month: 'short', year: 'numeric' });

                obj.users = elm.photo;
                obj.id = elm._id;
                obj.email = elm.email;
                obj.lastname = elm.lastname;
                obj.firstname = elm.firstname;
                obj.role = elm.role;
                obj.createdAt = Usersformat;
                obj.edited = false;
                obj.display = true;

                blockedAllData.push(obj);

            });

            return {
                ...state,
                users: action.payload.users,
                blocked: action.payload.blocked,
                usersApi: usersAllData,
                blockedApi: blockedAllData,
                usersAllApi: usersAllData,
                blockedAllApi: blockedAllData,
                loadingUsers: false,
                error: null,
            };

        case types.ADD_ADMIN_USERS:


            let obj_admin = {};
            let date = new Date(action.payload.createdAt);
            let Usersformat = date.toLocaleString('default', { month: 'short', year: 'numeric' });

            obj_admin.users = action.payload.photo;
            obj_admin.id = action.payload._id;
            obj_admin.email = action.payload.email;
            obj_admin.lastname = action.payload.lastname;
            obj_admin.firstname = action.payload.firstname;
            obj_admin.role = action.payload.role;
            obj_admin.createdAt = Usersformat;
            obj_admin.edited = false;
            obj_admin.display = true;



            return {
                ...state,
                users: state.users.map(elm => elm._id === obj_admin.id ? obj_admin : elm),
                blocked: state.blocked.map(elm => elm.id === obj_admin.id ? obj_admin : elm),
                usersApi: state.usersApi.map(elm => elm.id === obj_admin.id ? obj_admin : elm),
                blockedApi: state.blockedApi.map(elm => elm.id === obj_admin.id ? obj_admin : elm),
                usersAllApi: state.usersAllApi.map(elm => elm.id === obj_admin.id ? obj_admin : elm),
                blockedAllApi: state.blockedAllApi.map(elm => elm.id === obj_admin.id ? obj_admin : elm),
                loadingUsers: false,
                error: null,
            };

        case types.USERS_LOADING:

            return {
                ...state,
                loadingUsers: true,
                error: null,
            };

        case types.USERS_ERROR:

            return {
                ...state,
                loadingUsers: false,
                error: action.payload,
            };

        // Filtring Users

        case types.FILTRING_USERS:

            let currentUsersAllData = [], currentUsersData = [];

            if (action.payload.filter === 'all') {
                state.usersAllApi.forEach(elm => {
                    elm.display = true;
                    currentUsersAllData.push(elm);
                    if (
                        (elm.email && elm.email.toLowerCase().includes(state.currentSearch.toLowerCase())) ||
                        (elm.lastname && elm.lastname.toLowerCase().includes(state.currentSearch.toLowerCase())) ||
                        (elm.firstname && elm.firstname.toLowerCase().includes(state.currentSearch.toLowerCase()))
                    ) {
                        currentUsersData.push(elm);
                    }

                });
            } else {
                state.usersAllApi.forEach(elm => {

                    // console.log(elm, action.payload);

                    if (action.payload.filter === elm.role && action.payload.type) {
                        elm.display = true;
                        if (
                            (elm.email && elm.email.toLowerCase().includes(state.currentSearch.toLowerCase())) ||
                            (elm.lastname && elm.lastname.toLowerCase().includes(state.currentSearch.toLowerCase())) ||
                            (elm.firstname && elm.firstname.toLowerCase().includes(state.currentSearch.toLowerCase()))
                        ) {
                            currentUsersData.push(elm);
                        }
                        // was .filter
                    } else if (action.payload.filter === elm.role && !action.payload.type) {
                        elm.display = false;
                    } else if (action.payload.filter !== elm.role && elm.display) {
                        if (
                            (elm.email && elm.email.toLowerCase().includes(state.currentSearch.toLowerCase())) ||
                            (elm.lastname && elm.lastname.toLowerCase().includes(state.currentSearch.toLowerCase())) ||
                            (elm.firstname && elm.firstname.toLowerCase().includes(state.currentSearch.toLowerCase()))
                        ) {
                            currentUsersData.push(elm);
                        }
                    }
                    currentUsersAllData.push(elm);

                })
            }

            return {
                ...state,
                usersAllApi: currentUsersAllData,
                usersApi: currentUsersData,

            };

        case types.FILTRING_BLOCK_USERS:

            let currentBlockedAllData = [], currentBlockedData = [];

            if (action.payload.filter === 'all') {
                state.blockedAllApi.forEach(elm => {
                    elm.display = true;
                    currentBlockedAllData.push(elm);
                    if (
                        (elm.email && elm.email.toLowerCase().includes(state.currentBlockedSearch.toLowerCase())) ||
                        (elm.lastname && elm.lastname.toLowerCase().includes(state.currentBlockedSearch.toLowerCase())) ||
                        (elm.firstname && elm.firstname.toLowerCase().includes(state.currentBlockedSearch.toLowerCase()))
                    ) {
                        currentBlockedData.push(elm);
                    }

                });
            } else {
                state.blockedAllApi.forEach(elm => {

                    if (action.payload.filter === elm.role && action.payload.type) {
                        elm.display = true;
                        if (
                            (elm.email && elm.email.toLowerCase().includes(state.currentBlockedSearch.toLowerCase())) ||
                            (elm.lastname && elm.lastname.toLowerCase().includes(state.currentBlockedSearch.toLowerCase())) ||
                            (elm.firstname && elm.firstname.toLowerCase().includes(state.currentBlockedSearch.toLowerCase()))
                        ) {
                            currentBlockedData.push(elm);
                        }
                    } else if (action.payload.filter === elm.role && action.payload.filter) {
                        elm.display = false;
                    } else if (action.payload.filter !== elm.role && elm.display) {
                        if (
                            (elm.email && elm.email.toLowerCase().includes(state.currentBlockedSearch.toLowerCase())) ||
                            (elm.lastname && elm.lastname.toLowerCase().includes(state.currentBlockedSearch.toLowerCase())) ||
                            (elm.firstname && elm.firstname.toLowerCase().includes(state.currentBlockedSearch.toLowerCase()))
                        ) {
                            currentBlockedData.push(elm);
                        }
                    }
                    currentBlockedAllData.push(elm);

                })
            }

            return {
                ...state,
                blockedAllApi: currentBlockedAllData,
                blockedApi: currentBlockedData,

            };

        case types.SEARCH_USERS:


            let currentSearchUsersData = [];

            if (!state.usersApi || !state.usersAllApi) {
                return {
                    ...state,
                };
            }

            if (action.payload === '') {

                currentSearchUsersData = []
                state.usersAllApi.forEach(elm => {

                    if (elm.display) {
                        currentSearchUsersData.push(elm);
                    }

                })

            } else {
                currentSearchUsersData = [];

                state.usersAllApi.forEach(elm => {

                    if (elm.display && (
                        (elm.email && elm.email.toLowerCase().includes(action.payload.toLowerCase())) ||
                        (elm.lastname && elm.lastname.toLowerCase().includes(action.payload.toLowerCase())) ||
                        (elm.firstname && elm.firstname.toLowerCase().includes(action.payload.toLowerCase()))
                    )) {

                        currentSearchUsersData.push(elm);
                    }

                })

            }

            return {
                ...state,
                currentSearch: action.payload,
                usersApi: currentSearchUsersData,

            };

        case types.SEARCH_BLOCKED_USERS:

            let currentSearchBlockedsData = [];

            if (!state.blockedAllApi || !state.blockedAllApi) {
                return {
                    ...state,
                };
            }

            if (action.payload === '') {
                currentSearchBlockedsData = []
                state.blockedAllApi.forEach(elm => {

                    if (elm.display) {

                        currentSearchBlockedsData.push(elm);
                    }

                })


            } else {
                currentSearchBlockedsData = [];

                state.blockedAllApi.forEach(elm => {

                    if (elm.display && (
                        (elm.email && elm.email.toLowerCase().includes(action.payload.toLowerCase())) ||
                        (elm.lastname && elm.lastname.toLowerCase().includes(action.payload.toLowerCase())) ||
                        (elm.firstname && elm.firstname.toLowerCase().includes(action.payload.toLowerCase()))
                    )) {

                        currentSearchBlockedsData.push(elm);
                    }

                })

            }

            return {
                ...state,
                currentBlockedSearch: action.payload,
                blockedApi: currentSearchBlockedsData,

            };

        case types.BLOCK_USERS:

            let b1, b2, b3, u1, u2, u3, a, b, c;

            if (action.payload.status) {

                a = state.blocked.filter(user => user._id.toString() === action.payload.block.toString());
                b = state.blockedApi.filter(user => user.id.toString() === action.payload.block.toString());
                c = state.blockedAllApi.filter(user => user.id.toString() === action.payload.block.toString());

                u1 = state.blocked.filter(user => user._id.toString() !== action.payload.block.toString());
                u2 = state.blockedApi.filter(user => user.id.toString() !== action.payload.block.toString());
                u3 = state.blockedAllApi.filter(user => user.id.toString() !== action.payload.block.toString());

                b1 = state.users; b1.unshift(a[0]);
                b2 = state.usersApi; b2.unshift(b[0])
                b3 = state.usersAllApi; b3.unshift(c[0]);

            } else {

                a = state.users.filter(user => user._id.toString() === action.payload.block.toString());
                b = state.usersApi.filter(user => user.id.toString() === action.payload.block.toString());
                c = state.usersAllApi.filter(user => user.id.toString() === action.payload.block.toString());


                b1 = state.users.filter(user => user._id.toString() !== action.payload.block.toString());
                b2 = state.usersApi.filter(user => user.id.toString() !== action.payload.block.toString());
                b3 = state.usersAllApi.filter(user => user.id.toString() !== action.payload.block.toString());

                u1 = state.blocked; u1.unshift(a[0]);
                u2 = state.blockedApi; u2.unshift(b[0])
                u3 = state.blockedAllApi; u3.unshift(c[0]);

            }


            return {
                ...state,
                users: b1,
                usersApi: b2,
                usersAllApi: b3,
                blocked: u1,
                blockedApi: u2,
                blockedAllApi: u3

            }


        default:
            return state;
    }
};
