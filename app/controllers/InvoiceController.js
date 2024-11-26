export const CreateInvoice = async (req, res) => {
    try {
        return res.json({status:"Success"});
    }catch(err) {
        return res.json({status:"Fail",message:err.toString()})
    }
}



export const ReadInvoiceDetails = async (req, res) => {
    try {
        return res.json({status:"Success"});
    }catch(err) {
        return res.json({status:"Fail",message:err.toString()})
    }
}



export const ReadInvoiceList = async (req, res) => {
    try {
        return res.json({status:"Success"});
    }catch(err) {
        return res.json({status:"Fail",message:err.toString()})
    }
}