import billService from "../services/billService";
export const getHouseBill = async (req, res, next) => {
    try {
        const house_id=req.params.id;
        const result=await billService.getHouseBill(house_id)
        res.status(200).json({ msg: "get success", data: result, status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server Error", status: false })
    }
}
export const getSingleBillInfo = async (req, res, next) => {
    try {
        const bill_id=req.params.id;
        const result= await billService.getBillById(bill_id)
        res.status(200).json({ msg: "get success", data: result, status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server Error", status: false })
    }
}
export const updateBill = async (req, res, next) => {
    try {
        const bill_id=req.params.id;
        const data=req.body
        const result=await billService.updateBill(bill_id,data)
        res.status(200).json({ msg: "update success", data: result, status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message, status: false })
    }
}

export const deleteBill = async (req, res, next) => {
    try {
        const bill_id=req.params.id;
        const result = await billService.deleteBill(bill_id)
        res.status(200).json({ msg: "delete success", data: result, status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message, status: false })
    }
}

export const getBillByRenter = async (req,res,next) => {
    try {
        const renter_id = req.params.id
        const rs = await billService.getBillByRenter(renter_id)
        res.status(200).json({ msg: "delete success", data: rs, status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message, status: false })
    }
}

export const createBill = async (req,res,next) => {
    try {
        const {covenant_id,services} = req.body
        const rs = await billService.createBill({covenant_id,services})
        res.status(200).json({ msg: "create success", data: rs, status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message, status: false })
    }
}