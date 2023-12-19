const Endpoints = {
    Get: {
        GetAllRecords: '/api/records',
        GetRecordById: (id: string) => `/api/record/${id}`
    },
    Post: {
        SignIn: '/api/auth/sign-in',
        SignUp: '/api/auth/sign-up',
        AddRecord: '/api/record'
    },
    Put: {
        UpdateRecordById: (id: string) => `/api/record/${id}`
    },
    Delete: {
        RemoveRecordById: (id: string) => `/api/record/${id}`
    }
};

export default Endpoints;