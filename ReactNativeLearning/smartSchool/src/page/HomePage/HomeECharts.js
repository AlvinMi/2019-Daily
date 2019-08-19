import React, { Component } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import theme from "../../config/theme";
import Connect from "../../util/Connect";
import px2dp from "../../util/px2dp";
import { storage } from "../../storage/storage.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import WebChart from "../../component/WebChart/index";
import TeacherLogin from "../HomePage/TeacherLogin";
import MyPage from "../MyPage/MeFragment";
import DetailsScreen from "../../page/DetailsScreen";

// test
import TabBarItemComponent from "../../component/TabBarItemComponent";

class HomeECharts extends Component {
  static navigationOptions = {
    // tabBarVisible: false, // 隐藏底部导航栏
    // header: null // 隐藏顶部导航栏
    header: "云书包实验小学"
  };

  constructor(props) {
    super(props);
    this.state = {
      resData: "",
      teacherLogin: "",
      homeWork: "",
      achievement: "",
      lessionFileCountlist: "",
      testPaperCountlist: "",
      key: null
    };
  }

  // 在页面渲染前调用
  componentDidMount() {
    // 校长端首页数据统计
    Connect.queryHomePageByConditions({}, response => {
      if (response.success === "200") {
        // console.warn("校长端首页数据请求成功!", response.data);

        let homeChartData = {};
        homeChartData = response.data;
        storage.save("homeChartData", homeChartData);
        storage.load("homeChartData", data => {
          console.log("首页数据😀", data);

          this.setState({
            teacherLoginData: data.teacherLoginCountlist
          });
          console.log(this.state.teacherLoginData);
        });
        this.setState({
          resData: response.data,
          teacherLogin: response.data.teacherLoginCountlist,
          homeWork: response.data.homeWorkCountlist,
          achievement: response.data.studentAchievementCountlist,
          lessionFileCountlist: response.data.lessionFileCountlist,
          testPaperCountlist: response.data.testPaperCountlist
        });
      } else {
        Alert.alert("queryHomePageByConditions not 200", response.message);
      }

      console.log("emememememem", response.data);
    });

    // test
    let routeName = this.props.navigation.state.routeName;
    console.log("%c 查看当前路由", "background:#aaa;color:red", routeName);
  }

  _separator = () => {
    return <View style={{ height: 2, backgroundColor: "gray" }} />;
  };

  // _gotoTeacherLogin = () => {
  // };

  _loadParams = () => {
    // 路由需要的参数 obj, 使用这个读取 this.props.navigation.state.params
    storage.load("person", data => {
      let params = {};
      let gradeCode = [];
      let queryType = [];
      for (let i = 0; i < this.state.teacherLogin.length; i++) {
        gradeCode.push(this.state.teacherLogin[i].gradeCode);
        queryType.push(this.state.teacherLogin[i].queryType);
      }
      // console.log(gradeCode, queryType);
      // console.log(data.schoolId);
      params.schoolId = data.schoolId;
      params.gradeCodes = gradeCode;
      params.queryType = queryType[0]; // queryType 是一样的
      // console.log("我太难了~", params);
      this.props.navigation.navigate("TeacherLoginData", params);
    });
  };

  _alert(i) {
    switch (i) {
      case 0:
        // 路由需要的参数 obj, 使用这个读取 this.props.navigation.state.params
        storage.load("person", data => {
          let params = {};
          let gradeCode = [];
          let queryType = [];

          for (let j = 0; j < this.state.teacherLogin.length; j++) {
            gradeCode.push(this.state.teacherLogin[j].gradeCode);
            queryType.push(this.state.teacherLogin[j].queryType);
          }
          // console.log(gradeCode, queryType);
          // console.log(data.schoolId);
          params.schoolId = data.schoolId;
          params.gradeCodes = gradeCode;
          params.queryType = queryType[0]; // queryType 是一样的
          console.log("我太难了~", params);
          this.props.navigation.navigate("TeacherLoginData", params);
        });
        break;
      case 1:
        storage.load("person", data => {
          let params = {};
          let gradeCode = [];
          let queryType = [];
          for (let j = 0; j < this.state.homeWork.length; j++) {
            gradeCode.push(this.state.homeWork[j].gradeCode);
            queryType.push(this.state.homeWork[j].queryType);
          }
          params.schoolId = data.schoolId;
          params.gradeCodes = gradeCode;
          params.queryType = queryType[0];
          console.log("我太难了~", params);
          this.props.navigation.navigate("TeacherLoginData", params);
        });
        break;
      case 2:
        storage.load("person", data => {
          let params = {};
          let gradeCode = [];
          let queryType = [];
          for (let j = 0; j < this.state.achievement.length; j++) {
            gradeCode.push(this.state.homeWork[j].gradeCode);
            queryType.push(this.state.homeWork[j].queryType);
          }
          params.schoolId = data.schoolId;
          params.gradeCodes = gradeCode;
          params.queryType = queryType[0];
          console.log("我太难了~", params);
          this.props.navigation.navigate("TeacherLoginData", params);
        });
        break;
      case 3:
        storage.load("person", data => {
          let params = {};
          let gradeCode = [];
          let queryType = [];
          for (let j = 0; j < this.state.lessionFileCountlist.length; j++) {
            gradeCode.push(this.state.homeWork[j].gradeCode);
            queryType.push(this.state.homeWork[j].queryType);
          }
          params.schoolId = data.schoolId;
          params.gradeCodes = gradeCode;
          params.queryType = queryType[0];
          console.log("我太难了~", params);
          this.props.navigation.navigate("TeacherLoginData", params);
        });
        break;
      case 4:
        storage.load("person", data => {
          let params = {};
          let gradeCode = [];
          let queryType = [];
          for (let j = 0; j < this.state.testPaperCountlist.length; j++) {
            gradeCode.push(this.state.homeWork[j].gradeCode);
            queryType.push(this.state.homeWork[j].queryType);
          }
          params.schoolId = data.schoolId;
          params.gradeCodes = gradeCode;
          params.queryType = queryType[0];
          console.log("我太难了~", params);
          this.props.navigation.navigate("TeacherLoginData", params);
        });
        break;

      default:
        break;
    }
  }

  _jumpTeacherLoginApp = () => {
    // this.props.navigation.navigate("Other");
    console.log("得不到永远在 xx");
    this.props.navigation.navigate("TeacherLoginData");
  };

  // 渲染的条目 ({ index })
  _renderItem = item => {
    // 标题没有返回, 自己定了一个数组. 和后台返回的数据对应
    const title = [
      "各个年级教师登录次数(使用时长)",
      "各个年级作业布置数量",
      "各个年级学生成绩",
      "各个年级课件数量",
      "各个年级创建试题数量"
    ];

    // 渲染的数据
    let allData = [];
    for (let j = 0; j < 5; j++) {
      let renderData = {};
      switch (j) {
        case 0:
          renderData = this.state.teacherLogin;
          break;
        case 1:
          renderData = this.state.homeWork;
          break;
        case 2:
          renderData = this.state.achievement;
          break;
        case 3:
          renderData = this.state.lessionFileCountlist;
          break;
        case 4:
          renderData = this.state.testPaperCountlist;
          break;

        default:
          break;
      }
      let datas = [];
      for (let k = 0; k < renderData.length; k++) {
        let grade = {};
        grade.name = renderData[k].gradeName;
        grade.value = renderData[k].count;
        datas[k] = grade;
      }
      allData.push(datas);
      // console.log(allData);
    }

    const option = {
      title: {
        text: title[item.index],
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left"
      },
      series: [
        {
          name: "年级",
          type: "pie",
          selectedMode: "single",
          radius: [0, "80%"], // 缩放比例
          data: allData[item.index]
        }
      ]
    };
    return (
      <View>
        {/* <ScrollView> */}
        {/* <Button onPress={this._gotoTeacherLogin.bind(this)} title="点我！" /> */}
        {/* <Echarts option={option} height={400} /> */}
        <WebChart
          style={styles.chart}
          option={option}
          exScript={`
            chart.on('click', (params) => {
              if(params.componentType === 'series') {
                window.postMessage(JSON.stringify({
                  type: 'select',
                  payload: {
                    index: params.dataIndex,
                  },
                }));
              }
            });
          `}
          // onMessage={this.alertMessage}
        />
        {/* <TouchableNativeFeedback> */}
        <View style={{ height: px2dp(15) }}>
          <Text style={{ color: "blue", fontSize: px2dp(15) }} />
        </View>
        {/* </TouchableNativeFeedback> */}
        <View style={styles.container}>
          {/* <Button title="显示详情数据" onPress={this._jumpTeacherLoginApp} /> */}
          <Button
            title="显示详情数据"
            onPress={this._alert.bind(this, item.index)}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    );
  };

  // ================== test =============================== //
  _keyExtractor = (item, index) => {
    item.id;
    // console.log(item.homeWork, item.teacherLoginCountlist);
    // console.log(item, item.key);
    // console.log("heihei.", item.key);
  };

  // ================== test =============================== //
  render() {
    // 饼图的个数,取决于来自后台请求的字段
    let chatItem = [];
    for (var i = 0; i < 5; i++) {
      chatItem.push({ key: i, title: i + "" });
    }

    return (
      <View>
        <FlatList
          data={chatItem}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._separator}
          // renderItem={this._renderCharts}
          // onEndReached={info => {
          //   console.warn(info.distanceFromEnd);
          // }}
          //}}
          // 使用 id 作为列表每一项的 key
          keyExtractor={this._keyExtractor}
          // ItemSeparatorComponent={() => (
          //   <View
          //     style={{
          //       height: 1,
          //       backgroundColor: "#D6D6D6"
          //     }}
          //   />
          // )}
        />
        {/* <View style={styles.container}>
          <Button title="显示其他页面" onPress={this._showMoreApp} />
        </View> */}
      </View>
    );
  }
}

const RouteConfigs = {
  HomeECharts: {
    screen: HomeECharts, // screen 属性为必须配置属性
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "首页",
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItemComponent
          tintColor={tintColor}
          focused={focused}
          normalImage={require("../../assets/image/playing.png")}
          selectedImage={require("../../assets/image/playing-active.png")}
        />
      )
    })
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "我的",
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItemComponent
          tintColor={tintColor}
          focused={focused}
          normalImage={require("../../assets/image/coming.png")}
          selectedImage={require("../../assets/image/coming-active.png")}
        />
      )
    })
  }

  // Home2: {
  //   screen: Home2,
  //   path: "app/Home2",
  //   navigationOptions: {
  //     title: "这是在RouteConfigs中设置的title",
  //     headerTitleStyle: {
  //       fontSize: 10
  //     }
  //   }
  // }
  // Home3: { screen: Home3 },
};

// const StackNavigatorConfig = {
//   initialRouteName: "Home",
//   initialRouteParams: { initPara: "初始页面参数" },
//   navigationOptions: {
//     title: "标题",
//     headerTitleStyle: { fontSize: 18, color: "red" },
//     headerStyle: { height: 49 }
//   },
//   paths: "page/main",
//   mode: "card",
//   headerMode: "screen",
//   cardStyle: { backgroundColor: "#ffffff" },
//   transitionConfig: () => ({}),
//   onTransitionStart: () => {
//     console.log("页面跳转动画开始");
//   },
//   onTransitionEnd: () => {
//     console.log("页面跳转动画结束");
//   }
// };

export default createAppContainer(
  createBottomTabNavigator(RouteConfigs, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "首页") {
          // iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          iconName = "ios-home";
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === "我的") {
          iconName = "ios-person";
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#52A2FF",
      inactiveTintColor: "gray"
    }
  })
);

const styles = StyleSheet.create({
  actionBar: {
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? px2dp(20) : 0
  },
  title: {
    textAlign: "center"
  },
  charts: {
    width: "100%",
    padding: 10,
    // height: "20%",
    // backgroundColor: "gray",
    borderBottomColor: "#D3D3D3"
  },
  txt: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 30
  },

  // test echarts demo
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#111c4e"
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10
  },
  tip: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
    marginLeft: 10
  },
  chart: {
    height: 300,
    marginTop: 10,
    marginBottom: 40
  }
});
