---
title: 项目相关
date: 2021-01-06 19:03:16
tags: 实践与总结
categories: 实践与总结
---

## 文件上传流程改造与文件上传通用组件的封装

### 文件上传流程改造
主要是统一上传流程及上传规范。
原上传流程不同的业务后端会提供不同的接口用于文件上传，文件 id 和 地址也与具体的业务耦合在一起，另外服务端还需要将文件推送到第三方服务上。

现改造成项目中的上传都统一由文件服务管控，提供统一的通用接口。后端不再需要对文件进行中转处理，而是由前端直接将文件推送到第三方。

![上传服务改造前后流程](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/面试相关/上传服务改造前后流程.png)

前端文件上传到推送到第三方服务的具体流程：
![上传封装流程图](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/面试相关/上传封装流程图.jpg)

### 文件上传通用组件的封装

对 rc-upload 做二次封装，在 onBeforeUpload 中做文件校验：

- 文件大小校验
- 文件尺寸校验
- 文件格式校验

校验通过，调用上传接口，进行回调，返回 id


## 权限控制
权限控制要从以下方面进行梳理：

- 前端路由守卫
- 权限控制粒度化到操作

### 前端路由守卫

需求是需要鉴别用户当前访问的地址是否具有权限，如果有权限则正常跳转，否则无权限跳转到 403 页面，无效地址则跳转访问 404 页面。

一开始的思路是，拿到用户权限数据，对路由配置进行权限筛选，最后得到一个有权限路由配置数组。
但是这样会有个问题，就是无法判断匹配不到的路径地址应该跳转到 403 页面还是跳转到 404页面。

于是就在想 react-router 是不是提供了路由拦截方法，可以让我在路由跳转之前，捕获到该动作，并进行一些判断处理。

当时查阅了相关文档以及问题搜索，都没有发现类似的 api。
不过在查阅的过程中在社区中看到了一些路由权限管控相关的博文，在实现思路上做出了转换。

那就是把路由拦截的时机调整到组件渲染前这个阶段。在路由匹配的时候，是会根据我们配置的component进行渲染的，如果是无权限路由，我们事先做好重定向的配置，在路由匹配的时候就能够直接进行重定向了。

实现代码类似于：

```
const menus = [
  {
    path: '/users/students',
    permissionCode: 'STUDENTS_COMPONENT',
    name: '学生管理',
    component: UserManagement,
    redirect: '/403', // 动态判断加入的配置，此处直接写死
  },
  {
    path: '/users/teachers',
    permissionCode: 'TEACHERS_COMPONENT',
    name: '教师管理',
    component: TeacherManagement,
  }
];

<Switch>
  {menus?.map((route) => {
      // 省略细节处理
        <Route
          key={route.path}
          path={route.path}
          component={(_props) => {
            // 403 或其他重定向处理
            if (route.redirect) {
              return (
                <Redirect
                  to={route.redirect}
                />
              );
            }

            return (
              <route.component {..._props} />
            );
          }}
        />
    })
  }
  
  // 404 page 跳转
  <Route key="not-found" path="*" redirect="/404" />
</Switch>
  
```

### 权限控制粒度化到操作

背景：不仅需要将权限控制到菜单级别，还需要具体控制到页面的操作，比如新增、编辑、下载等，如果没有权限需要做隐藏处理。

初版方案设计：

后端：
    由后端保存用户的权限菜单数据，菜单下对应的操作权限数据
    
前端：
    前端获取到权限数据后，会与前端路由树进行匹配筛选。
    前端提供权限控制组件，该组件接收一个操作 code 以及需要控制的 children 组件，组件内部会对当前 code 进行权限判断，决定是否显示当前组件。
    
权限控制初版方案数据：
![权限控制设计初版](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/面试相关/权限控制设计初版.png)

权限控制初版方案前端通用组件设计：
```
// 使用
return (
    <AuthComponent
        code="TEACHERS_COMPONENT.EDIT"
        children={<button>编辑</button>}
    />
)

// 组件设计：AuthComponent.jsx

export const AuthComponent = ({
  code,
  children
}) => {
  // 这里会拿到所有具有权限的 code 数组, optionCodes
  // ...

  return (
    <>
     {
       optionCodes?.includes(code) && (
         children
       )
     }
    </>
  )
}
```

初版方案存在的问题分析

- 在数据维护上，前后端都需要维护菜单和操作的code，维护数据过多，但操作种类基本可以固定几种，做了很多重复工作
- 在组件使用上，每一种操作都需要去关注对应的 code，提高了使用的复杂度。

复杂度的提高也容易增加使用过程中的出错率。因此进行了方案的重新设计，设计的核心是简化数据维护的工作量，简化组件的使用，减少对操作 code 的依赖。

针对上述问题，制定出了按位计算操作的方案，前后端都不需要关心操作对应 code 了。
基本思路是：
约定好操作的位值：
| 操作 | 位值 |
| ---  | --- |
| 新增 | 1 |
| 编辑 | 2 |
| 删除 | 4 |
| 上传 | 8 |
| 下载 | 16 |
| ... | ... |
| ... | 2^n |

后端位值返回数据（按位加）：
![2](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/面试相关/2.0版本后端返回权限数据.png)
前端路由维护：
![2](https://cdn.jsdelivr.net/gh/huangwenjuning/single-minded-images@master/面试相关/2.0版本前端数据维护.png)

前端通用控制组件：
自定义权限 hook, 它接收菜单 code, 返回权限数组。

```
    const [hasAdd, hasEdit, hasDelete] = useAuth('TEACHERS_COMPONENT');
    
    // useAuth 做的事情
    // 接收到code，从后端数据中拿到当前操作位值
    
    export const useAuth = (code) => {
      // 这里是从接口获取到的数据
      const permissionsMap = {
        STUDENTS_COMPONENT: 7,
        TEACHERS_COMPONENT: 6
      };
    
      // 拿到当前菜单的权限位值
      const bits = permissionsMap[code];
    
      return [...Number(bits).toString(2)].reverse().map((item) => +item === 1) // 类似这样 [true, true, true]
    }
```




## 数据报表数据共享处理

redux 做请求数据缓存与更新，减少请求次数。
数据概览
报表详情

## 其他问题

### 文件下载问题及处理

在处理文件流的下载时，因为配置问题，导致下载下来的文件与上传文件不一致。

问题排查过程：
1、排查是前端还是后端问题，用 postman 模拟
2、定位是前端问题，那就是分析问题出在哪个步骤：
　　A. 在拿到文件流后，对文件流的处理出了问题
　　B. 在文件传输过程中文件发生了更改

最后定位到是因为 responseType 在不做配置的情况下，默认是 responseType: 'text' 类型来接收数据，在接收流的时候因为类型不匹配，导致传输过程中文件被转换。

解决方案：进行流文件下载处理时，需要将请求的 responseType 设置为 'blob'

下载实现：
```
const downloadBlob = ({ data, filename = '' }) => {
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(data);

  link.download = filename;

  document.body.appendChild(link);

  const evt = document.createEvent('MouseEvents');

  evt.initEvent('click', false, false);
  link.dispatchEvent(evt);
  document.body.removeChild(link);
};

```

### 多文件流传参处理

在项目中遇到过一次需要传递多个文件流的场景。
formData 的多文件流传递需要通过循环来 append，最终服务端拿到的会是数组。

```
const formData = new FormData();
const fileArray = [file, file, file]

for (let i = 0; i< fileArray.length; i++ ) {
  formData.append('file', fileArray[i]);
}

console.log(formData.getAll('file')) // 可拿到文件流数组
```

但是在实际业务中，二次修改的时候，可能只重新上传了某一个文件，这个时候，就需要维护一个标志位数组，与文件流数组一一对应。

例如：
file: [binary,binary,binary];
type: ['userConfig', 'systemConfig', 'otherConfig'];
