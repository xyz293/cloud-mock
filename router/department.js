const department = require('../sql/department')
const express = require('express')
const router = express.Router()
router.get('/getDepartment',async (req, res) => {
      try{
        const {id} = req.query
        if(!id){
            res.send({
                code: 400,
                msg: '参数错误'
            })
        }
        else {
            const result = await department.getDepartment(id)
            if(result.length == 0){
                res.send({
                    code: 400,
                    msg: '部门不存在'
                })
            }
            else {
                res.send({
                    code: 200,
                    msg: '查询成功',
                    data: result
                })
            }
        }
      }
      catch(err){
        res.send({
            code: 500,
            msg: '查询失败'
        })
      }
})
router.post('/addDepartment',async (req, res) => {
    try{
        const {company_id,name,description,manager,state,create_time,update_time} = req.body
        if(!name || !company_id){
            res.send({
                code: 400,
                msg: '参数错误'
            })
        }
        else {
            const result = await department.addDepartment(company_id,name,description,manager,state,create_time,update_time)
            if(result.affectedRows == 0){
                res.send({
                    code: 400,
                    msg: '添加失败'
                })
            }
            else {
                res.send({
                    code: 200,
                    msg: '添加成功',
                    data: result
                })
            }
        }
    }
    catch(err){
        res.send({
            code: 500,
            msg: '添加失败'
        })
    }
})
router.delete('/deleteDepartment/:id',async (req, res) => {
    try{
        const {id} = req.params
        if(!id){
            res.send({
                code: 400,
                msg: '参数错误'
            })
        }
        else {
            const result = await department.deleteDepartment(id)
            if(result.affectedRows == 0){
                res.send({
                    code: 400,
                    msg: '删除失败'
                })
            }
            else {
                res.send({
                    code: 200,
                    msg: '删除成功',
                    data: result
                })
            }
        }
    }
    catch(err){
        res.send({
            code: 500,
            msg: '删除失败'
        })
    }
})
router.put('/updateDepartment',async (req, res) => {
    try{
        const {id,name,description,manager,state,create_time,update_time} = req.body
        if(!id || !name){
            res.send({
                code: 400,
                msg: '参数错误'
            })
        }
        else {
            const result = await department.updateDepartment(id,name,description,manager,state,create_time,update_time)
            if(result.affectedRows == 0){
                res.send({
                    code: 400,
                    msg: '更新失败'
                })
            }
            else {
                res.send({
                    code: 200,
                    msg: '更新成功',
                    data: result
                })
            }
        }
    }
    catch(err){
        res.send({
            code: 500,
            msg: '更新失败'
        })
    }
})
module.exports = router
