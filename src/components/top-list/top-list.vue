<template>
  <transition name='slide'>
    <MusicList :rank='rank' :songs='songs' :title='title' :bgImage='bgImage'></MusicList>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {getMusicList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
  import {getMusic} from 'api/singer'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getMusicList()
    },
    computed: {
      ...mapGetters([
          'topList'
        ]),
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      }
    },
    methods: {
      _getMusicList() {
        if(!this.topList.id) {
          this.$router.push({path: '/rank'});
          return 
        }
        getMusicList(this.topList.id).then((res) => {
          if(res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist);
          }
        })
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          let musicData = item.data;
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
  
</style>