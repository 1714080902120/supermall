<template>
  <div v-if="Object.keys(list).length !== 0" id="detail-params-info" :style="{ 'font-size': defaultFontSize }">
    <div class="size-outer">
      <div class="key">{{sizeKey()}}</div>
      <table :style="{ width }" v-for="(table, index) in list.rule.tables" :key="index">
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
    </div>
    <div class="info-outer">
      <table :style="{ width }">
        <tr v-for="item in list.info.set" :key="item.key">
          <td>{{item.key}}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="desc">{{desc()}}</div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    list: Object
  },
  data () {
    return {
      fontSize: window.innerWidth / 15.625 + 'px',
      width: window.innerWidth + 'px',
      defaultFontSize: window.innerWidth / 20.83 + 'px'
    }
  },
  computed: {
    sizeKey () {
      return () => {
        return this.list.rule.key
      }
    },
    desc () {
      return () => {
        return this.list.rule.disclaimer
      }
    }
  }
}
</script>

<style lang="less" scoped>
@color: rgba(167, 163, 163, 0.2) ;
  #detail-params-info {
    .size-outer {
      table {
        position: relative;
        margin: 20px 0;
        padding: 0;
        border-collapse: collapse;
        tr {
          display: flex;
          margin: 30px 0;
          padding-bottom: 15px;
          border-bottom: 2px solid @color;
          text-align: center;
          td {
            flex: auto;
            vertical-align: middle;
            &:first-child {
              text-align: left;
            }
          }
        }
      }
    }
    .info-outer {
      margin: -60px 0;
      table {
        position: relative;
        margin: 20px 0;
        padding: 0;
        border-collapse: collapse;
        tr {
          display: flex;
          margin: 30px 0;
          padding-bottom: 15px;
          border-bottom: 2px solid @color;
          justify-content: space-around;
          td {
            flex: auto;
            vertical-align: middle;
            &:first-child {
              text-align: left;
            }
            &:last-child {
              color: #f00;
            }
          }
        }
      }
    }
    .key {
      &::before {
        content: '【';
      }
      &::after {
        content: '】';
      }
    }
    .desc {
      margin: 50px 0;
      color: rgba(245, 119, 167, 1)
    }
  }
</style>