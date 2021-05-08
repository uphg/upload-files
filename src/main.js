const formData = new FormData();

const hash = []

const submit = document.querySelector('#submit')
const remove = document.querySelector('#remove')
const index = document.querySelector('#index')
const imageList = document.querySelector('.image-list')

formData.append('title', '# 上传文件列表')
console.log('formData')
console.log(formData)
const file = document.querySelector('#file')
file.addEventListener('input', (event) => {
  console.log('event')
  console.log(event)
  const fileList = event.target.files
  console.log('fileList')
  console.log(fileList)
  for (let i = 0; i < fileList.length; i++) {
    hash.push(fileList[i].name)
    formData.append(fileList[i].name, fileList[i])
    const image = createImage(fileList[i])
    imageList.appendChild(image)
  }
  console.log('end - formData')
  console.log(formData)
})


submit.addEventListener('click', () => {
  const request = new XMLHttpRequest();   //创建对象
  request.open('POST', 'http://xxx.xxx.xxx:8088/', true);

  request.onreadystatechange = function () {
    console.log('state change', request.readyState);
    if (request.readyState == 4) {
      var obj = JSON.parse(request.responseText);   //返回值
      console.log(obj);
      if (obj.fileUrl.length) {
        alert('上传成功');
      }
    }
  }
  request.send(formData)
})




remove.addEventListener('click', () => {
  console.dir(index.value)
  const number = Number(index.value)
  formData.delete(hash[number])
  hash.splice(number, 1)
  console.log('hash')
  console.log(hash)
})

function createImage(file) {
  const image = document.createElement('img');
  image.src = window.URL.createObjectURL(file)
  return image
}