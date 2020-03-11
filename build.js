#! /usr/local/bin/node

const { Disk } = require("jtree/products/Disk.node.js")
const { jtree } = require("jtree")
const moment = require("moment")
const path = __dirname + "/full_data.csv"
const data = jtree.TreeNode.fromCsv(Disk.read(path).trim())

const zeroDay = "2020-01-21"
const dateFormat = "YYYY-MM-DD"

const convertDateToDayIncrement = date =>
  moment(date, dateFormat)
    .diff(moment(zeroDay, "YYYY-MM-DD"), "days")
    .toString()

data.forEach(node => {
  node.set("year", convertDateToDayIncrement(node.get("date")))
  node.rename("location", "country")
  node.delete("date")
})

Disk.write("output.csv", data.toDelimited(",", "country,year,new_cases,new_deaths,total_cases,total_deaths".split(",")))

