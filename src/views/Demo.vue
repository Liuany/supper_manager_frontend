<template>
  <div>
    <div class="box">🔔 {{ billboard.content.name }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CarBar></CarBar>
      </div>
    </div>
  </div>
</template>

<script>
import CarBar from "@/views/card/CardBar";
import PostList from "@/views/post/Index";

export default {
  name: "Demo",
  components: { CarBar, TopicList: PostList },
  data() {
    return {
      billboard: {content:'这是初始化公告信息'}
    };
  },
};
</script>