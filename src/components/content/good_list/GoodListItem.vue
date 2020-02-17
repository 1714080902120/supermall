<template>
  <div class="good-list-item" :style="{ 'width': width, 'font-size': fontWidth }">
    <div class="img">
      <slot name="img"></slot>
    </div>
    <div class="title" :style="{ 'height': fontWidth }">
      <slot name="title"></slot>
    </div>
    <div class="price-collect">
      <div class="price">
        <slot name="price"></slot>
      </div>
      <div class="collect" :style="{ 'height': fontWidth }">
        <div class="svg" @click="collect()">
          <span v-if="!active">
            <slot name="svg"></slot>
          </span>
          <span v-if="active">
            <slot name="svg-active"></slot>
          </span>
          <slot name="collectNum"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  data () {
    return {
      active: false,
      width: window.innerWidth / 2 + 'px',
      fontWidth: window.innerWidth / 20 + 'px'
    }
  },
  methods: {
    collect () {
      this.active = !this.active
    }
  }
}
</script>

<style lang="less">
  .good-list-item {
    margin: 0;
    padding: 4px;
    flex: auto;
    font-size: 14px;
    font-family: cursive;
    font-weight: bold;
    text-align: center;
    .title {
      width: 100%;
      // overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      a {
        &:link {
          color: rgba(200, 50, 50, .8);
        }
      }
    }
    .price-collect {
      display: flex;
      margin-top: 3px;
      line-height: 100%;
      .collect {
        margin: 0 12px;
      }
      span {
        float: left;
      }
    }
    .img {
      img {
        width: 100%;
      }
    }
  }
  img {
    border-radius: 5px;
  }

</style>