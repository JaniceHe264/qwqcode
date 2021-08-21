<template>
  <div class="admin-index">
    <el-container>
      <el-aside width="300px">
        <div class="left-menu">
          <el-menu
            :default-active="7"
            class="el-menu-vertical-demo"
          >
            <el-sub-menu :index="item.id" v-for="item in menuList" :key="item.id">
              <template #title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="child.id" v-for="child in item.children" :key="child.id">{{ child.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AdminIndex",
  data() {
    return {
      menuList: [
        {
          id: 1,
          name: '文章管理',
          children: [{
            id: 7,
            name: '文章列表'
          }]
        }, {
          id: 2,
          name: '评论管理',
          children: [{
            id: 8,
            name: '评论列表'
          }]
        }, {
          id: 3,
          name: '用户管理',
          children: [{
            id: 9,
            name: '添加用户',
          }, {
            id: 10,
            name: '用户列表'
          }]
        }, {
          id: 4,
          name: '菜单管理',
          children: [{
            id: 11,
            name: '添加菜单',
          }, {
            id: 12,
            name: '菜单列表'
          }]
        }, {
          id: 5,
          name: '角色管理',
          children: [{
            id: 13,
            name: '添加角色'
          }, {
            id: 14,
            name: '角色列表'
          }]
        }, {
          id: 6,
          name: '权限管理',
          children: [{
            id: 15,
            name: '权限列表'
          }]
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.admin-index {
  .el-menu-item.is-active {
    color: $theme-color;
  }

  .el-menu-item:hover {
    background-color: #e7f1eb;
  }
}
</style>
