window.addEventListener('load', () => {
  'use strict'
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  const buttonAdd = document.querySelector('.button-add')
  const buttonClear = document.querySelector('.button-clear')
  const textFiled = document.querySelector('.text-filed')
  const taskList = document.querySelector('.task-list')
  let number = 0

  const buttonClickEvent = (e) => {
    if (e.type === 'keypress' && e.keyCode !== 13) return null
    if (textFiled.value) {
      let li = document.createElement('li')
      let liClone = {}
      li.number = number++
      li.innerText = textFiled.value
      liClone.text = textFiled.value
      liClone.done = false
      taskList.appendChild(li)
      tasks.push(liClone)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      textFiled.value = ''
      textFiled.placeholder = ''
    }
  }

  if (tasks.length) textFiled.placeholder = ''
  const fragment = document.createDocumentFragment('div')
  tasks.forEach( item => {
    let li  = document.createElement('li')
    li.innerText = item.text
    li.number = number++
    if (item.done) li.classList.add('done')
    fragment.appendChild(li)
  })
  taskList.appendChild(fragment)


  buttonAdd.addEventListener('click', buttonClickEvent)
  window.addEventListener('keypress', buttonClickEvent)

  buttonClear.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
  })

  taskList.addEventListener('mousedown', (e) => {
    let li = e.target
    if (li.localName === 'li') {
      tasks[li.number].done = li.classList.toggle('done')
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  })
})
