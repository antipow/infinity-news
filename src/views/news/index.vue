<template>
    <div class="news-container">
        <v-card v-for="(news_item, index) in news" :key="index" class="mx-auto mb-5" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="news_item.urlToImage"></v-img>
            <v-card-title class="mb-2">{{news_item.title}}</v-card-title>
            <v-card-subtitle>{{news_item.publishedAt | formatDate}}</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="mb-2">
                    {{news_item.description}}
                </div>
                <v-divider class="mb-2"></v-divider>
                <p class="font-weight-thin">{{news_item.source.name}}</p>
            </v-card-text>
        </v-card>
        <v-skeleton-loader v-for="n in 5" :key="n" class="mx-auto mb-5" max-width="400" type="article"></v-skeleton-loader>
    </div>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: 'news',
        components: {},
        filters: {
            formatDate: function (value) {
                if (value) {
                    return moment(String(value)).format('DD.MM.YYYY hh:mm')
                }
            }
        },
        data() {
            return {
                loading: true,
                bottom: 0,
                dialog: {
                    show: false,
                    content: ''
                },
                news: [],
            }
        },
        created() {
            window.addEventListener('scroll', () => {
                this.bottom = this.bottomVisible()
            });
            this.getTopNews()
        },
        watch: {
            bottom(bottom) {
                if (bottom) {
                    this.getEverythingNews();
                }
            }
        },
        methods: {
            getTopNews: function () {
                axios
                    .get('https://newsapi.org/v2/top-headlines?country=ru&apiKey=be73aac3cdc44de99103a13e1d06e7b0&pageSize=100', {crossdomain: true})
                    .then(response => {
                        this.news = response.data.articles;
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
                    .finally(() => (this.loading = false));
            },
            getEverythingNews: function () {
                axios
                    .get('https://newsapi.org/v2/everything?q=%D0%B0&language=ru&apiKey=be73aac3cdc44de99103a13e1d06e7b0&pageSize=20', {crossdomain: true})
                    .then(response => {
                        this.news.push(...response.data.articles);
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    })
                    .finally(() => (this.loading = false));
            },
            bottomVisible() {
                const scrollY = window.scrollY;
                const visible = document.documentElement.clientHeight;
                const pageHeight = document.documentElement.scrollHeight;
                const bottomOfPage = visible + scrollY >= pageHeight;
                return bottomOfPage || pageHeight < visible;
            },
        }
    }
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>