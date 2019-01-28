<template>
  <transition name='slide'>
    <MusicList :songs='songs' :title='title' :bg-image='bgImage'></MusicList>   
  </transition> 
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {getMusic} from 'api/singer'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
          'singer'
        ])
    },
    created() {
      this._getDetail()
    }, 
    methods: {
      _getDetail() {
        if(!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if(res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list);
          }
        })
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          let {musicData} = item;
          if(musicData.songid && musicData.albummid) {
            getMusic(musicData.songmid).then((res) => {
              const svley = res.data.items
              const songVkey = svley[0].vkey
              ret.push(createSong(musicData, songVkey))
            })
          }
        }) 
        return ret     
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>