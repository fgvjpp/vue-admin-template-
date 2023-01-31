function digui(depts, deptsDatas) {
  const data = []
  if (deptsDatas) {
    deptsDatas.forEach(item => {
      if (depts.id === item.pid) {
        data.push(digui(item, deptsDatas))
      }
    })
    if (data.length > 0) depts.children = data
    return depts
  } else {
    depts.forEach(item => {
      if (item.pid === '') { // 筛选一级菜单
        data.push(digui(item, depts)) // 判断当前菜单是否有子级菜单 最终递归完后就返回数据push到data
      }
    })
    return data
  }
}
function digui2(treeList, item2) {
  const obj = {
    ...item2,
    children: []
  }
  treeList.forEach(item => {
    if (item2.id === item.pid) {
      obj.children.push(digui2(treeList, item))
    }
  })
  if (obj.children.length > 0) {
    return obj
  } else {
    return item2
  }
}

export {
  digui,
  digui2
}
