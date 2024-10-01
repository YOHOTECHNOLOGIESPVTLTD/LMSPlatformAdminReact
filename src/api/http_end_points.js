export const API_END_POINTS ={
    institute : {
        getAll : "/api/lms/platform/getAll",
        create : "/api/lms/platform/",
        get : "/api/lms/platform/"
    },
    branch: {
        all : "/api/institutes/"
    },
    auth : {
       verify_otp : "/api/auth/verify-otp/"
    },
    subscription : {
        all : "/api/subscription/plans",
        create : "/api/subscription/plan/"
    },
    faq_category : {
    all : "/api/lms/faq-category/",
    create : "/api/lms/faq-category/"
    },
    faq : "/api/lms/faq/",
    fileUpload : "/api/upload/",
    fileUploads : "/api/upload/mutiple/"
}