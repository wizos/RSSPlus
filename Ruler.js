var Ruler = (function() {
    function add(title, link, feeds) {
        feeds.push({
            "title": title,
            "link": link
        });
        return feeds;
    }

    function find(url, res = "") {
        var feeds = [];
        var m;
        if ((m = url.match(/36kr\.com\/newsflashes/is))) {
            //feeds.push({"https://rsshub.app/36kr/newsflashes":"快讯 - 36氪"});
            return add("快讯 - 36氪", "https://rsshub.app/36kr/newsflashes", feeds);
        }
        if ((m = url.match(/36kr\.com\/search\/articles\/([^?]+?)(\?|\/|$)/is))) {
            return add(m[1] + " - 36氪", "https://rsshub.app/36kr/search/article/" + m[1], feeds);
        }

        //# 【UP主发布的视频】
        // 示例：http://space.bilibili.com/88461692
        // UP主前缀1：https://api.prprpr.me/bilibili2rss/user/，https://rsshub.app/bilibili/user/video/ [作者：github.com/DIYgod]
        // UP主前缀2：https://api.lim-light.com/bilibili/rss/?id=
        // UP主前缀3：https://script.google.com/macros/s/AKfycbzojPIDsSo3fC2sb8xLWnXh9YwSUC_TsvSe9araLFuwnGLd8CXP/exec?mid=
        // UP主前缀4：http://rss.wizos.me/bilibili.php?id= , [作者：github.com/Wizos]
        if ((m = url.match(/space\.bilibili\.com\/(\d+)/s))) {
            add("UP主的投稿视频", "https://rsshub.app/bilibili/user/video/" + m[1], feeds);
            add("UP主的专栏文章", "https://rsshub.app/bilibili/user/article/" + m[1], feeds);
            add("UP主的动态", "https://rsshub.app/bilibili/user/dynamic/" + m[1], feeds);
            add("UP主的默认收藏夹", "https://rsshub.app/bilibili/user/fav/" + m[1], feeds);
            add("UP主的投币视频", "https://rsshub.app/bilibili/coin/fav/" + m[1], feeds);
            add("UP主的粉丝", "https://rsshub.app/bilibili/followers/fav/" + m[1], feeds);
            add("UP主关注的用户", "https://rsshub.app/bilibili/followings/fav/" + m[1], feeds);
            return feeds;
        }

        // 示例：https://www.bilibili.com/video/av33147686
        if (url.match(/bilibili\.com\/video\//s) && res) {
            console.log("内容：" + res);
            let tmp1 = res.match(/space\.bilibili\.com\/(\d+)/s);
            let tmp2 = res.match(/"name":"(.*?)"/s);
            return add(tmp2[1] + "的投稿视频", "https://rsshub.app/bilibili/user/video/" + tmp1[1], feeds);
        }

        //# 【番剧】
        //// 示例：http://bangumi.bilibili.com/anime/5800
        //// 前缀1：https://api.prprpr.me/bilibili2rss/bangumi/{id} （作者：github.com/DIYgod/bilibili2RSS）
        //// 前缀2：https://bilibili2rss.bid/anime/{id} （作者：github.com/wdssmq/Bilibili2RSS）
        if ((m = url.match(/bangumi\.bilibili\.com\/anime\/(\d+)/s))) {
            return add("该番剧的RSS", "https://rsshub.app/bilibili/bangumi/" + m[1], feeds);
        }
        //# 【直播间】
        ////eg: https://live.bilibili.com/23058
        if ((m = url.match(/live\.bilibili\.com\/(\d+)/is))) {
            return add("直播间 RSS", "https://rsshub.app/bilibili/live/room/" + m[1], feeds);
        }

        if (url.match(/binux\.blog/is)) {
            return add("RSS", "https://binux.blog/atom.xml", feeds);
        }

        // 示例：https://blog.csdn.net/u011729865/rss/list
        if ((m = url.match(/blog\.csdn\.net\/([^?]+?)(\?|\/|$)/s))) {
            return add("RSS", "https://blog.csdn.net/" + m[1] + "/rss/list", feeds);
        }
        //eg: https://book.qidian.com/info/1010400217
        if ((m = url.match(/book\.qidian\.com\/info\/(\d+)/is))) {
            add("本书讨论区 RSS", "https://rsshub.app/qidian/forum/" + m[1], feeds);
            return add("本书章节更新 RSS", "https://rsshub.app/qidian/chapter/" + m[1], feeds);
        }
        //eg: https://danjuanapp.com/funding/001073?channel=1300100141
        if ((m = url.match(/danjuanapp\.com\/funding\/(\d+)/s))) {
            return add("基金净值更新 RSS", "https://rsshub.app/xueqiu/fund/" + m[1] + "/rss/list", feeds);
        }

        // 示例：https://www.douban.com/group/blabla/
        if ((m = url.match(/douban\.com\/group\/([^?]+?)(\?|\/|$)/s))) {
            return add("小组 RSS", "https://rsshub.app/douban/group/" + m[1], feeds);
        }

        // https://www.douban.com/people/48007616/
        if ((m = url.match(/douban\.com\/people\/([^?]+?)(\?|\/|$)/s))) {

            add("用户的收藏 RSS", "https://www.douban.com/feed/people/" + m[1] + "/interests", feeds);
            add("用户的日记 RSS", "https://www.douban.com/feed/people/" + m[1] + "/notes", feeds);
            add("用户的广播 RSS", "https://www.douban.com/feed/people/" + m[1] + "/status", feeds);

            return feeds;
        }

        // https://book.douban.com/subject/6723066/
        // https://music.douban.com/subject/5958397/
        // https://movie.douban.com/subject/1292063/
        if ((m = url.match(/douban\.com\/subject\/(\d+)(\?|\/|$)/s))) {
            return add("该项目 RSS", "https://www.douban.com/feed/subject/" + m[1] + "/reviews", feeds);
        }

        //https://rsshub.app/douban/explore/column/2
        if ((m = url.match(/douban\.com\/explore\/column\/(\d+)(\?|\/|$)/s))) {
            return add("豆瓣发现 RSS", "https://rsshub.app/douban/explore/column/" + m[1], feeds);
        }

        //#【直播间】
        //eg: https://www.douyu.com/24422
        if ((m = url.match(/douyu\.com\/(\d+)/is))) {
            return add("斗鱼直播间", "https://rsshub.app/douyu/room/" + m[1], feeds);
        }

        // eg:https://dribbble.com/search?q=google
        if ((m = url.match(/dribbble\.com\/search\?q=([^?]\w+?)(\?|\/|$)/s))) {
            return add("Shots tagged '" + m[1] + "'", "https://rsshub.app/dribbble/keyword/" + m[1], feeds);
        }
        // 示例：https://dribbble.com/Orizon
        if ((m = url.match(/dribbble\.com\/([^?]\w+?)(\?|\/|$)/s))) {
            return add(m[1] + "'s Shots", "https://rsshub.app/dribbble/user/" + m[1], feeds);
        }

        // 仓库 releases: https://github.com/:owner/:repo/releases.atom
        // 仓库 commits: https://github.com/:owner/:repo/commits.atom
        // 用户动态: https://github.com/:user.atom
        if ((m = url.match(/github\.com\/([^?]+?)\/([^?]+?)(\?|\/|$)/s))) {
            return add("RSS", "https://github.com/" + m[1] + "/" + m[2] + "/releases.atom", feeds);
            //return "https://github.com/m[1]/m[2]/releases.atom";
            //return "https://github.com/m[1]/m[2]/commits.atom";
            //return "https://github.com/m[1].atom";
            //return "https://rsshub.app/github/issue/m[1]/m[2]";
            //return "https://rsshub.app/github/stars/m[1]/m[2]";
            //return "https://rsshub.app/github/user/followers/m[1]";
        }

        //#示例：https: //henix.github.io/feeds/weixin.sogou.wxieshuo/index.xml
        if ((m = url.match(/henix\.github\.io\/feeds\/([^?\/]+?)(\?|\/|$)/s))) {
            return add("RSS", "https://henix.github.io/feeds/" + m[1] + "/index.xml", feeds);
        }

        // 【INS】
        // 示例：https://www.instagram.com/adax.l
        // 前缀：http://feed.exileed.com/instagram/feed/{user_name}
        if (!url.match(/instagram\.com\/(accounts|about|developer|legal|explore|directory)(\?|\/|$)/is) && (m = url.match(/instagram\.com\/([^?]+?)(\?|\/|$)/s))) {
            return add("RSS", "https://rsshub.app/instagram/user/" + m[1], feeds);
        }

        if (url.match(/jandan\.net/is)) {
            add("煎蛋 RSS", "http://feedex.net/feed/http://feeds2.feedburner.com/jandan", feeds);
            add("煎蛋：无聊图 RSS", "https://rsshub.app/jandan/pic", feeds);
            add("煎蛋：妹子图 RSS", "https://rsshub.app/jandan/ooxx", feeds);
            add("煎蛋：一周话题 RSS", "http://feeds.feedburner.com/jiandan-hotcomments", feeds);

            return feeds;
        }

        if (url.match(/jianshu\.com/is)) {
            add("热门 RSS", "https://rsshub.app/jianshu/trending/weekly", feeds);

            if ((m = url.match(/jianshu\.com\/c\/(.+?)(&|\?|\/|$)/s))) {
                add("专题 RSS", "https://rsshub.app/jianshu/collection/" + m[2], feeds);
            } else if((m = url.match(/jianshu\.com\/(u|users)\/(.+?)(&|\?|\/|$)/s))) {
                add("作者 RSS", "https://rsshub.app/jianshu/user/" + m[2], feeds);
            }

            return feeds;
        }

        //eg: https://medium.com/censorship/shadowsocks-all-clients-157d02c15182
        //eg: https://medium.com/@unbiniliumm/%E5%A6%82%E4%BB%8A%E6%88%91%E8%BF%99%E6%A0%B7%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91-95187ef07ced
        if ((m = url.match(/medium\.com\/([@\w]+?)(\?|\/|$)/s))) {
            return add(m[1], "https://medium.com/feed/" + m[1], feeds);
        }

        if ((m = url.match(/music\.163\.com\/#\/playlist\?id=(\d+)/s))) {
            return add("RSS", "https://rsshub.app/ncm/playlist/" + m[1], feeds);
        }

        //if ( (m = url.match(/newrank\.cn\/public\/info\/detail\.html\?account=([^?]+?)(\?|\/|$)/s) ) ) {
        //    if(is_admin){
        //        return "http://rss.wizos.me/weixin.php?id=".strtolower(m[1], feeds);
        //    }else{
        //        return "http://rss.wizos.me/anyv.php?id=".strtolower(m[1], feeds);
        //    }
        //}

        //#【直播间】
        //eg: https://www.panda.tv/10300
        if ((m = url.match(/panda\.tv\/(\d+)/is))) {
            return add("熊猫直播间", "https://rsshub.app/panda/room/" + m[1], feeds);
        }

        // 来源：http://readhub.bayes.cafe/
        if (url.match("/readhub\.cn/s")) {
            add("所有频道", "http://readhub.bayes.cafe/rss?channel=all", feeds);
            add("热门话题", "http://readhub.bayes.cafe/rss?channel=topics", feeds);
            add("科技动态", "http://readhub.bayes.cafe/rss?channel=news", feeds);
            add("开发者资讯", "http://readhub.bayes.cafe/rss?channel=technews", feeds);

            return feeds;
        }

        // http://www.t66y.com/thread0806.php?fid=7
        if (url.match(/t66y\.com\/thread0806\.php\?fid=7/is)) {
            add("技术讨论区", "https://rsshub.app/t66y/7", feeds);
            add("技术讨论区(过滤摘录的帖子)", "http://feeds.feedburner.com/cl-jstlq", feeds);
            add("技术讨论区-周报", "http://feeds.feedburner.com/cl-jstlq-hot", feeds);
            return feeds;
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=16/is)) {
            return add("达盖尔的旗帜", "https://rsshub.app/t66y/16", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=8/is)) {
            return add("新时代的我们", "https://rsshub.app/t66y/8", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=22/is)) {
            return add("在线成人区", "https://rsshub.app/t66y/22", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=21/is)) {
            return add("HTTP 下载区", "https://rsshub.app/t66y/21", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=27/is)) {
            return add("转帖交流区", "https://rsshub.app/t66y/27", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=26/is)) {
            return add("中字原创区", "https://rsshub.app/t66y/26", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=25/is)) {
            return add("国产原创区", "https://rsshub.app/t66y/25", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=5/is)) {
            return add("动漫原创区", "https://rsshub.app/t66y/5", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=4/is)) {
            return add("欧美原创区", "https://rsshub.app/t66y/4", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=15/is)) {
            return add("亚洲有码原创区", "https://rsshub.app/t66y/15", feeds);
        }
        if (url.match(/t66y\.com\/thread0806\.php\?fid=2/is)) {
            return add("亚洲无码原创区", "https://rsshub.app/t66y/2", feeds);
        }

        if ((m = url.match(/tieba\.baidu\.com\/(f\?kw=|[^(p\/)])(.+?)(&|\?|\/|$)/s))) {
            add("普通帖 RSS", "https://rsshub.app/tieba/forum/" + m[2], feeds);
            add("精品帖 RSS", "https://rsshub.app/tieba/forum/good/" + m[2], feeds);
            return feeds;
        }

        if ((m = url.match(/tieba\.baidu\.com\/p\/(\d+)/s))) {
            add("帖子动态 RSS", "https://rsshub.app/tieba/post/" + m[1], feeds);
            add("楼主动态 RSS", "https://rsshub.app/tieba/post/" + m[1] + "?see_lz=0", feeds);
            return feeds;
        }

        // 示例：https://twitter.com/Haneristy
        if ((m = url.match(/twitter\.com\/([^?]+?)(\?|\/|$)/s))) {
            add("动态", "http://www.twitrss.me/twitter_user_to_rss/?user=" + m[1], feeds);
            add("动态", "https://rsshub.app/twitter/user/" + m[1], feeds);

            return feeds;
        }

        // 【V2ex节点】
        // 前缀：https://www.v2ex.com/feed/{name}.xml
        // 示例1：https://www.v2ex.com/?tab=apple
        // 示例2：https://www.v2ex.com/go/apple
        if ((m = url.match(/v2ex\.com\/\?tab=([^?]+?)(\?|\/|$)/s)) || (m = url.match(/v2ex\.com\/go\/([^?]+?)(\?|\/|$)/s))) {
            return add("RSS", "https://www.v2ex.com/feed/" + m[1] + ".xml", feeds);
        }

        // 【V2ex帖子】
        // 示例：https://www.v2ex.com/t/423065
        if ((m = url.match(/v2ex\.com\/t\/(\d+)/s))) {
            return add("RSS", "https://rss.lilydjwg.me/v2ex/" + m[1], feeds);
        }
        // 【V2ex用户】
        // https://www.v2ex.com/member/xuanwu
        if ((m = url.match(/v2ex\.com\/member\/([^?]+?)(\?|\/|$)/s))) {
            return add("RSS", "https://www.v2ex.com/feed/member/" + m[1] + ".xml", feeds);
        }

        // 示例1：http://weibo.com/u/1452388845
        if ((m = url.match(/weibo\.(com|cn)\/(u|profile)\/(\d+)/s))) {
            add("博主 RSS (方案1)", "https://rsshub.app/weibo/user/" + m[3], feeds);
            add("博主 RSS (方案2)", "https://rssfeed.today/weibo/rss/" + m[3], feeds);
            return feeds;
        }
        // 示例2：https://weibo.com/kaifulee
        if ((m = url.match(/weibo\.(com|cn)\/([^?]+?)(\?|\/|$)/s)) && (m = res.match(/fuid=(\d+)/s))) {
            add("博主 RSS (方案1)", "https://rsshub.app/weibo/user/" + m[1], feeds);
            add("博主 RSS (方案2)", "https://rssfeed.today/weibo/rss/" + m[1], feeds);
            return feeds;
        }

        // 【喜玛拉雅】
        // 示例：http: //www.ximalaya.com/renwen/5088879/
        if ((m = url.match(/ximalaya\.com\/([^?]+?)\/(\d+)(\?|\/|$)/s))) {
            add("官方 RSS(可能不存在)", "https://www.ximalaya.com/album/" + m[2] + ".xml", feeds);
            add("三方 RSS(RSSHub)", "https://rsshub.app/ximalaya/album/" + m[1] + "/" + m[2], feeds);
            add("三方 RSS(Podcast4us)", "http://podcast4us.herokuapp.com/xmly/" + m[2] + '.xml', feeds);
            return feeds;
        }

        // eg: https://xueqiu.com/u/6654628252
        if ((m = url.match(/xueqiu\.com\/u\/(\d+)/s))) {
            add("用户的全部动态", "https://rsshub.app/xueqiu/user/" + m[1], feeds);
            add("用户的原发布", "https://rsshub.app/xueqiu/user/" + m[1] + '/0');
            add("用户的长文", "https://rsshub.app/xueqiu/user/" + m[1] + '/2');
            add("用户的问答", "https://rsshub.app/xueqiu/user/" + m[1] + '/4');
            add("用户的热门", "https://rsshub.app/xueqiu/user/" + m[1] + '/9');
            add("用户的交易", "https://rsshub.app/xueqiu/user/" + m[1] + '/11');
            add("用户的收藏", "https://rsshub.app/xueqiu/favorite/" + m[1], feeds);
            add("用户的自选", "https://rsshub.app/xueqiu/user_stock/" + m[1], feeds);
            return feeds;
        }

        // #【Youtobe频道】
        // 示例：https://www.youtube.com/channel/UCpzx9sMpCwKP_xTwoYZx7lA
        if ((m = url.match(/youtube\.com\/channel\/([^?]+?)(\?|\/|$)/s))) {
            add("官方", "https://www.youtube.com/feeds/videos.xml?channel_id=" + m[1], feeds);
            add("RSSHub(支持播放视频)", "https://rsshub.app/youtube/channel/" + m[1], feeds);
            return feeds;
        }

        // #【知乎用户】
        // 示例1：https://www.zhihu.com/people/zhupengfei
        // 示例2：https://www.zhihu.com/org/lao-ba-ping-ce/answers
        if ((m = url.match(/zhihu\.com\/(people|org)\/([^?]+?)(\?|\/|$)/s))) {

            add("用户的动态", "https://rsshub.app/zhihu/people/activities/" + m[2], feeds);
            add("用户的回答", "https://rsshub.app/zhihu/people/answers/" + m[2], feeds);
            add("用户的想法", "https://rsshub.app/zhihu/people/pins/" + m[2], feeds);

            // add("知乎日报", "https://rsshub.app/zhihu/daily", feeds);
            // add("知乎热榜", "https://rsshub.app/zhihu/hotlist", feeds);
            // add("知乎新书", "https://rsshub.app/zhihu/bookstore/newest", feeds);
            // add("知乎想法-24小时新闻汇总", "https://rsshub.app/zhihu/pin/daily", feeds);
            // add("用户的回答", "https://rss.lilydjwg.me/zhihu/" + m[1], feeds);// （只支持回答和文章两种类型)
            return feeds;
        }

        if ((m = url.match(/zhihu\.com\/collection\/(\d*)(\?|\/|$)/s))) {
            add("收藏夹", "https://rsshub.app/zhihu/collection/" + m[1], feeds);
            return feeds;
        }

        if ((m = url.match(/zhihu\.com\/question\/(\d+)(\?|\/|$)/s))) {
            add("该问题的RSS", "https://rsshub.app/zhihu/question/" + m[1], feeds);
            return feeds;
        }

        // #【知乎专栏】
        // 示例：https://zhuanlan.zhihu.com/p/28089565?group_id=873134374130970624
        if (url.match(/zhuanlan\.zhihu\.com\/p\/\d*(\?|\/|$)/s) && (m = res.match(/ColumnPageHeader-TitleColumn.+href="(.+?)"/s))) {
            url = "http://" + m[1].trim() + "/";
        }
        //// 示例：https://zhuanlan.zhihu.com/dingxiangyisheng
        //if( (m=url.match(/zhuanlan\.zhihu\.com\/(?!p\/)([\w][\w-]*)(\?|\/|$)/isU)) ){
        //  //return "https://rss.lilydjwg.me/zhihuzhuanlan/".m[1];
        //  //return "http://zhihurss.miantiao.me/zhihuzhuanlan/".m[1];
        //  add("专栏", "https://rsshub.app/zhihu/zhuanlan/" + m[1], feeds);
        //}
        // 示例：https://zhuanlan.zhihu.com/dingxiangyisheng
        if ((m = url.match(/zhihu\.com\/column\/([\w][\w-]*)(\?|\/|$)/is))) {
            add("专栏", "https://rsshub.app/zhihu/zhuanlan/" + m[1], feeds);
            return feeds;
        }

        // 示例1：https://zhiy.cc/communitynote
        if ((m = url.match(/zhiy\.cc\/([^?]+?)(\?|\/|$)/s))) {
            add("RSS", "https://rsshub.app/zhiy/" + m[1] + "/letter", feeds);
            return feeds;
        }

        // https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=%E6%97%A0%E4%BA%BA%E6%9C%BA&_sacat=0&_rss=1
        if (url.match(/www\.ebay\.com\/sch\/i\.html.*?/s) && !url.match("&_rss=")) {
            add("RSS", url + "&_rss=1", feeds);
            return feeds;
        }

        // 示例：https://www.reddit.com/r/Anki/top
        if ((m = url.match(/reddit\.com\/r\/([\w\W]+)(\?|\/|$)/is))) {
            let id = m[1];
            id = id.replace(/\/+$/g, "");
            id = id.replace(/\.rss$/g, "");

            add("Community Posts", "https://www.reddit.com/r/" + id + ".rss", feeds);
            return feeds;
        }

        //eg: http://search.smzdm.com/?c=home&s=%E5%A5%B3%E8%A3%85&order=time&v=b
        if ((m = url.match(/search\.smzdm\.com\/\?.*?[\?&]s=([^?]+?)(\?|\/|&|$)/is))) {
            add("关键词：" + decodeURI(m[1]), "https://rsshub.app/smzdm/keyword/" + m[1], feeds);

            return feeds;
        }

    }
    return {
        find: find
    };
})();