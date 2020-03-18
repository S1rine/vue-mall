import Toast from './Toast'
const obj = {}

obj.install = (Vue) => {
  // 创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 创建一个组件对象
  const toast = new toastConstructor();

  // 将组件对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // toast.$el 对应的就是 div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
}

export default obj