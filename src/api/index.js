import httpClient from "./http-client";
import { API_END_POINTS } from "./http_end_points";


class Client {
   auth = {
      verify_otp : (data) => httpClient.post(API_END_POINTS.auth.verify_otp,data)
   }
   institute = {
    all : (params) => httpClient.get(API_END_POINTS.institute.getAll,params),
    getWithId : (params) => httpClient.get(API_END_POINTS.institute.get+params.id),
    create : (data,params) => httpClient.post(API_END_POINTS.institute.create,data,params)
   }
   branch = {
      get_all : (params) => httpClient.get(`/api/institutes/${params.institute}/branches/institute/all`)
   }
   subscription = {
    all : (params) => httpClient.get(API_END_POINTS.subscription.all,params),
    create : (data) => httpClient.post(API_END_POINTS.subscription.create,data),
    get_all : (data) => httpClient.get(API_END_POINTS.subscription.get_all,data)
   }
   notification = {
      create : (data) => httpClient.post(API_END_POINTS.notification.create,data),
      get_all : (params) => httpClient.get(API_END_POINTS.notification.get_all,params),
      resend : (querys) => httpClient.get(API_END_POINTS.notification.resend,querys)
   }
   payments = {
      get_all : (params) => httpClient.get(API_END_POINTS.payments.getAll,params),
      getWidId : (params) => httpClient.get(API_END_POINTS.payments.getWithId + params?.institute)
   }
   file ={
   upload : (data) => httpClient.uploadFile(API_END_POINTS.fileUpload,data),
   uploads : (data) => httpClient.uploadFile(API_END_POINTS.fileUploads,data)
   }
   faq_category = {
      get : (querys) => httpClient.get(API_END_POINTS.faq_category.all,querys),
      create : (data) => httpClient.post(API_END_POINTS.faq_category.create,data),
      update : (data) => httpClient.patch(API_END_POINTS.faq_category.create+data.id,data),
      delete : (data) => httpClient.delete(API_END_POINTS.faq_category.create+data.id) 
   }
   faq = {
     get : () => httpClient.get(API_END_POINTS.faq),
     create : (data) => httpClient.post(API_END_POINTS.faq,data),
     update : (data) => httpClient.patch(API_END_POINTS.faq+data.id,data),
     delete : (data) => httpClient.delete(API_END_POINTS.faq+data.id)
   }
}

export default new Client()