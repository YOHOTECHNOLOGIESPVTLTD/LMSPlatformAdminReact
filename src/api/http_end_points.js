export const API_END_POINTS ={
    institute : {
        getAll : "/api/lms/platform/getAll",
        create : "/api/lms/platform/",
        get : "/api/lms/platform/"
    },
    branch: {
        all : "/api/institutes/"
    },
    notification : {
        create : "/api/notification/institute/notifications",
        get_all : "api/notification/institute/all",
        resend  : "/api/notification/institute/resend-notification/"
    },
    payments : {
      getAll : "/api/lms/platform/payments/subscription-management/all/",
      getWithId : "/api/lms/platform/payments/subscription-management/payment/"
    },
    auth : {
       verify_otp : "/api/auth/verify-otp/"
    },
    subscription : {
        all : "/api/subscription/plans",
        get_all : "/api/subscription/plans/all",
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