<template>
  <footer class="footer has-text-grey-light has-background-grey-darker">
    <div class="container" >
      <div>
        <div style="float: left;text-align">
            <span style="margin-right:20px;margin-left:320px;">{{ title }} ALL RIGHTS RESERVED</span>
            <span style="margin-right:20px">地址：韶山市步行街</span>
            <span style="margin-right:20px;">联系方式：138-0732-3865</span>
        </div>
        
        <div style="float: right">
          <template>
            <b-taglist attached>
              <b-tag type="is-dark" size="is-normal">Design</b-tag>
              <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
            </b-taglist>
          </template>
        </div>
      </div>
    </div>
    <back-top></back-top>
  </footer>
</template>

<script>
import BackTop from "@/components/Backtop/BackTop";

export default {
  name: "Footer",
  components: {
    BackTop
  },
  data() {
    return {
      title: "© " + new Date().getFullYear() + ' 晓春服装管理系统',
      author: 'Kevin',
    };
  },
};
</script>

<style scoped>
.container{width:100%;min-height:100%;position:relative;}

footer {
    margin-top: 10px;
    padding: 1rem 1.5rem 2.4rem;
}

footer a{
  color: #bfbfbf;
}
</style>