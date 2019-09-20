const Helper = {
  getProductArray(){
    return [
      {element: 'input', type: 'text', id: 'name', label:'Name'},
      {element: 'file', type: 'file', id: 'picture', label:'Picture'},
      {element: 'input', type: 'number', id: 'stock', label:'Stock'},
      {element: 'input', type: 'number', id: 'price', label:'Price'},
      {element: 'textarea', id: 'description', label:'Decription'},
    ]
  },
  getClientsArray(){
    return [
      {element: 'input', type: 'text', id: 'full_name', label:'Full Name'},
      {element: 'input', type: 'text', id: 'address', label:'Address'},
      {element: 'input', type: 'tel', id: 'phone', label:'Phone'},
      {element: 'input', type: 'email', id: 'email', label:'Email'},
    ]
  },
  getUsersArray(options){
    return [
      {element: 'input', type: 'text', id: 'first_name', label:'First Name'},
      {element: 'input', type: 'text', id: 'last_name', label:'Last Name'},
      {element: 'input', type: 'text', id: 'address', label:'Address'},
      {element: 'input', type: 'tel', id: 'phone', label:'Phone'},
      {element: 'input', type: 'email', id: 'email', label:'Email'},
      {element: 'select', id: 'role', label:'Role', options:options},
    ]
  },
  getPromotionsArray(){
    return [
      {element: 'input', type: 'text', id: 'name', label:'Name'},
      {element: 'file', type: 'file', id: 'picture', label:'Picture'},
      {element: 'input', type: 'number', id: 'stock', label:'Stock'},
      {element: 'input', type: 'number', id: 'price', label:'Price'},
      {element: 'textarea', id: 'description', label:'Description'},
    ]
  },
  getPromotionProductArray(options){
    return [
      {element: 'select', id: 'product_id', label:'Product', options:options},
      {element: 'input', type: 'number', id: 'quantity', label:'Quantity'},
    ]
  },
  getOrdersArray(options){
    return [
      {element: 'select', id: 'client_id', label:'Client', options:options},
      {element: 'input', type: 'number', id: 'subtotal', label:'Subtotal'},
      {element: 'input', type: 'number', id: 'tax', label:'Tax'},
      {element: 'input', type: 'number', id: 'total', label:'Total'},
      {element: 'textarea', id: 'observation', label:'Observation'},
    ]
  },
  getOrderPromotionArray(options){
    return [
      {element: 'select', id: 'promotion_id', label:'Promotion', options:options},
      {element: 'textarea', id: 'observation', label:'Observation'},
      {element: 'input', type: 'number', id: 'quantity', label:'Quantity'},
      {element: 'input', type: 'number', id: 'price', label:'Price'},
    ]
  },
  getOrderProductArray(options){
    return [
      {element: 'select', id: 'product_id', label:'Product', options:options},
      {element: 'textarea', id: 'observation', label:'Observation'},
      {element: 'input', type: 'number', id: 'quantity', label:'Quantity'},
      {element: 'input', type: 'number', id: 'price', label:'Price'},
    ]
  },
  serializeObj(obj){
    return obj.reduce((acc, item)=>{
      acc[item.id] = item;
      return acc;
    }, {});
  },
  roleHasAccess(role, path){
    const data = {
      admin: ['menu', 'password', 'report', 'product', 'client', 'user', 'promotion', 'order'],
      manager: ['menu', 'password', 'report', 'product', 'client', 'promotion', 'order'],
      seller: ['menu', 'password', 'client', 'order'],
    }
    let response = false;
    data[role.toLowerCase()].forEach(subPath =>
      {
        if(path.toLowerCase().includes(subPath)) response = true;
      })
    return response;
  },
  objHasEmpty(obj){
    for (const key in obj){
      if (obj[key] === '') return true;
    }
    return false
  }
}

export default Helper;
