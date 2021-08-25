<template>
  <div class="admin-index">
    <el-container>
      <el-aside width="300px">
        <div class="left-menu" v-if="menuList.length > 0">
          <el-menu
            router
            :default-active="menuList[0].children[0].path"
            class="el-menu-vertical-demo"
          >
            <el-sub-menu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template #title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="child.path"
                              v-for="child in item.children" :key="child.id">{{ child.name }}
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
import {getUserMenuList} from "@/api/menu";
import {mapGetters} from 'vuex'

export default {
  name: "AdminIndex",
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.getMenuList()
  },
  computed:{
    ...mapGetters(['getAuth'])
  },
  methods: {
    getMenuList() {
      getUserMenuList().then(res => {
        if (res.code == 200) {
          const menuList = res.data.filter(item => item.parentId == 0)
          this.list2tree(res.data, menuList)
          this.menuList = menuList;
          console.log(this.menuList)
        }
      })
    },
    list2tree(list, data) {
      if (data.length == 0) {
        return data
      }
      data.forEach(item => {
        item.children = list.filter(l => l.parentId == item.id);
        this.list2tree(list, item.children);
      })
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
