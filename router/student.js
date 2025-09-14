const express = require('express')
const router = express.Router()
const student = require('../sql/student')
router.post('/add',async (req,res)=>{
    try{
        const {name,phone,email,department,major,student_no,gender,school_id,enrollment_year,status,create_time,update_time}
        = req.body
        if(!name || !phone || !email || !department || !major || !student_no || !gender || !school_id || !enrollment_year || !status){
            res.send({
                code:400,
                msg:'参数错误'
            })
        }else {
            const result = await student.addStudent(name,phone,email,department,major,student_no,gender,school_id,enrollment_year,status,create_time,update_time)
            if(result){
                res.send({
                    code:200,
                    msg:'添加成功'
                })
            }else {
                res.send({
                    code:400,
                    msg:'添加失败'
                })
            }
        }
    }catch(err){
        res.send({
            code:500,
            msg:'添加失败'
        })
    }
})
router.get('/list',async (req,res)=>{
    try{
        const {id} = req.query
        const result = await student.getSchool_student(id)
        if(result){
            res.send({
                code:200,
                msg:'查询成功',
                data:result
            })
        }else {
            res.send({
                code:400,
                msg:'查询失败'
            })
        }
    }catch(err){
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})
router.get('/getOne',async (req,res)=>{
    try{
        const {name} = req.query
        const result = await student.getStudent(name)
        if(result){
            res.send({
                code:200,
                msg:'查询成功',
                data:result
            })
        }else {
            res.send({
                code:400,
                msg:'查询失败'
            })
        }
    }catch(err){
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})
router.get('/getMajor',async (req,res)=>{
    try{
        const {major} = req.query
        const result = await student.getMajor_student(major)
        if(result){
            res.send({
                code:200,
                msg:'查询成功',
                data:result
            })
        }else {
            res.send({
                code:400,
                msg:'查询失败'
            })
        }
    }catch(err){
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})
router.get('/getDepartment',async (req,res)=>{
    try{
        const {department} = req.query
        const result = await student.getDepartment_student(department)
        if(result){
            res.send({
                code:200,
                msg:'查询成功',
                data:result
            })
        }else {
            res.send({
                code:400,
                msg:'查询失败'
            })
        }
    }catch(err){
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})
router.delete('/delete',async (req,res)=>{
    try{
        const {id} = req.query
        const result = await student.deleteStudent(id)
        if(result){
            res.send({
                code:200,
                msg:'删除成功'
            })
        }else {
            res.send({
                code:400,
                msg:'删除失败'
            })
        }
    }catch(err){
        res.send({
            code:500,
            msg:'删除失败'
        })
    }
})
router.get('/getMyStudent',async (req,res)=>{
    try{
        const {userid} = req.query
        const result = await student.getMyStudent(userid)
        if(result){
            res.send({
                code:200,
                msg:'查询成功',
                data:result
            })
        }else {
            res.send({
                code:400,
                msg:'查询失败'
            })
        }
    }catch(err){
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})
module.exports = router