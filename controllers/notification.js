
const pushNotificationService=require("../services/notification.js");




module.exports.pushnotify=(devices,content,title)=>{
    console.log(devices)
    const message={
        app_id:process.env.API_ID,
        contents:{en:content},
        included_segments:["included_player_ids"],
        include_player_ids:devices,
        content_available:true,
        small_icon:"ic_stat_onesignal_default",
        data:{
            pushTitle:title,
        }
    }

     pushNotificationService.SendNotification(message,(error,results)=>{
        if(error){
            return {
                message:"Error",
                error: error,
            };
        }
        return {
            message:"Success",
            data: results,
        }
    })

        
}