import schedule from 'node-schedule';
import CovenantService from "../services/covenant";
import BillService from "../services/billService";
export class MyJobScheduler {
  static scheduleJobBill() {

    const job = schedule.scheduleJob('*/10 * * * * *', async () => {     // 10s
    // const job = schedule.scheduleJob('0 0 0 * * *', async () => {      // 1 day
      let date = new Date();
      console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()+ "    " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
      await this.scheduleJobCovenant();
    });
  }

  // schedule for covenant duration and pay time
  static async scheduleJobCovenant() {
    const listCovenant = await CovenantService.getAllCovenantActive();
    for (let index in listCovenant) {
      // check ovenant.duration = now date('dd')
      let date = new Date();
      let day = date.getDate();

      console.log(listCovenant[index].duration);
      let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      if(listCovenant[index].duration <= 0 || listCovenant[index].duration == null || listCovenant[index].duration > lastDayOfMonth){
        listCovenant[index].duration = lastDayOfMonth;
      }
      console.log(listCovenant[index]);
      if (listCovenant[index].duration == day) {
        let convenant = listCovenant[index];
        // console.log("covenant duration", convenant.duration);
        let check = await BillService.checkHaveBillInMoth(convenant.id)
        // console.log("   check exits bill of covenant id", convenant.id, check);
        if(!check){
          let bill = {
            covenant_id: convenant.id,
            convenant_room: convenant.room_id,
            services: convenant.services,
          }
          // console.log("bill", bill);
          await BillService.createBill(bill);
        }
      } else {
        // console.log("covenant not duration", listCovenant[index].duration);
      }
    }
  }
}
