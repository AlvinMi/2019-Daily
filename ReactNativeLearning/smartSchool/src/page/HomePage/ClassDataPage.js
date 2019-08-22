import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView
} from "react-native";
import WebChart from "../../component/WebChart/index";
import theme from "../../config/theme";
import Connect from "../../util/Connect";
import px2dp from "../../util/px2dp";
import { storage } from "../../storage/storage.js";

export default class ClassDataPage extends Component {
  static navigationOptions = {
    title: "云书包实验小学"
  };

  constructor(props) {
    super(props);
    this.state = {
      itemLenght: null,
      subjects: null,
      subjectCount: null,
      title: [],
      classIds: [],
      graphic: [], // 没有数据的情况下默认暂时
      hint: [] // button 提示作用
    };
  }

  // 在页面渲染前调用
  componentDidMount() {
    // ----------------- test -------------------- //
    const graphicData = [
      {
        type: "image",
        id: "logo",
        right: 20,
        top: 20,
        z: -10,
        bounding: "raw",
        origin: [75, 75],
        style: {
          image: "http://echarts.baidu.com/images/favicon.png",
          width: 150,
          height: 150,
          opacity: 0.4
        }
      }
      // {
      //     type: 'group',
      //     rotation: Math.PI / 4,
      //     bounding: 'raw',
      //     right: 110,
      //     bottom: 110,
      //     z: 100,
      //     children: [
      //         {
      //             type: 'rect',
      //             left: 'center',
      //             top: 'center',
      //             z: 100,
      //             shape: {
      //                 width: 400,
      //                 height: 50
      //             },
      //             style: {
      //                 fill: 'rgba(0,0,0,0.3)'
      //             }
      //         },
      //         {
      //             type: 'text',
      //             left: 'center',
      //             top: 'center',
      //             z: 100,
      //             style: {
      //                 fill: '#fff',
      //                 text: 'ECHARTS BAR CHART',
      //                 font: 'bold 26px Microsoft YaHei'
      //             }
      //         }
      //     ]
      // },
      // {
      //     type: 'group',
      //     left: '10%',
      //     top: 'center',
      //     children: [
      //         {
      //             type: 'rect',
      //             z: 100,
      //             left: 'center',
      //             top: 'middle',
      //             shape: {
      //                 width: 190,
      //                 height: 90
      //             },
      //             style: {
      //                 fill: '#fff',
      //                 stroke: '#555',
      //                 lineWidth: 2,
      //                 shadowBlur: 8,
      //                 shadowOffsetX: 3,
      //                 shadowOffsetY: 3,
      //                 shadowColor: 'rgba(0,0,0,0.3)'
      //             }
      //         },
      //         {
      //             type: 'text',
      //             z: 100,
      //             left: 'center',
      //             top: 'middle',
      //             style: {
      //                 fill: '#333',
      //                 text: [
      //                     '横轴表示温度，单位是°C',
      //                     '纵轴表示高度，单位是km',
      //                     '右上角有一个图片做的水印',
      //                     '这个文本块可以放在图中各',
      //                     '种位置'
      //                 ].join('\n'),
      //                 font: '14px Microsoft YaHei'
      //             }
      //         }
      //     ]
      // }
    ];
    // ----------------- test -------------------- //

    // 取首页数据
    // storage.load("homeChartData", value => {
    //   this.setState({ title: null });
    // });

    // console.log(this.props.navigation.state.params);
    const params = this.props.navigation.state.params;
    console.log("菲奥娜", params);

    Connect.queryEverySubjectDataAnalysisByClazz(params, res => {
      if (res.success === "200") {
        console.log("各个班科目📕返回数据", res.data, typeof res.data);
        const showClassName = []; // 班级
        const showSubjects = []; // x 轴
        const showSubjectCount = []; // y 轴

        for (let i = 0; i < res.data.length; i++) {
          const className = res.data[i].className;
          showClassName.push(className);

          let Subjects = [];
          let SubjectCount = [];
          let analysData = res.data[i].dataAnalysisVos;
          // console.log("OwO", analysData, analysData.length);

          // 遍历每个年级的班级名字 和 人数
          let count = analysData.length;

          for (let j = 0; j < count; j++) {
            const name = analysData[j].subjectName;
            Subjects.push(name);

            const count = analysData[j].count;
            SubjectCount.push(count);
          }
          showSubjects.push(Subjects);
          showSubjectCount.push(SubjectCount);
        }

        // 遍历对象
        const classIdArr = [];
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            classIdArr.push(params[key]);
          }
        }
        console.log("遍历出来的对象😡", classIdArr);

        this.setState({
          itemLenght: res.data.length, // 图形 Item 的个数, 根据返回长度来判断.
          title: showClassName,
          subjects: showSubjects,
          subjectCount: showSubjectCount,
          queryType: params.queryType,
          classIds: classIdArr,
          hint: params.hint
        });
      } else {
        Alert.alert("按条件查询数据失败.", response.message);
      }
    });
  }

  // 分隔栏
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: "gray" }} />;
  };

  _jumpHomeWorkPage(item) {
    console.log("_jumpHomeWorkPage", item, this.state.classIds);
    let params = {};

    params.classId = this.state.classIds[0][item].classId; // 二维数组中的第一个
    params.queryType = this.state.queryType;
    params.subCode = "";
    params.sTime = "";
    params.eTime = "";
    params.page = 3;
    params.pageSize = 1;

    console.log("向下一页(HomeWork)传递的参数", params);

    this.props.navigation.navigate("HomeWork", params);
  }

  // 渲染的条目
  _renderItem = item => {
    // ------------- test --------------- //

    // ------------- test --------------- //
    const option = {
      // title: {
      //   text: this.state.title[item.index],
      //   x: "center"
      // },
      tooltip: {},
      xAxis: {
        // x 轴坐标显示名字
        data: this.state.subjects[item.index]
      },
      yAxis: {},
      graphic: this.state.graphic,
      series: [
        {
          name: "人数",
          type: "bar",
          data: this.state.subjectCount[item.index]
        }
      ]
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}> {this.state.title[item.index]} </Text>
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
        />
        {/* <View style={{ height: px2dp(15) }}>
            <Text style={{ color: "blue", fontSize: px2dp(15) }} />
          </View> */}
        <View style={styles.btn}>
          <Button
            title={`显示 ${this.state.title[item.index]} ${
              this.state.hint[parseInt(this.state.queryType) - 1]
            }详情数据`}
            onPress={this._jumpHomeWorkPage.bind(this, item.index)}
          />
        </View>
      </View>
    );
  };

  render() {
    var chatItem = [];
    console.log("柱状图个数: ", this.state.itemLenght);
    for (var i = 0; i < this.state.itemLenght; i++) {
      chatItem.push({ key: i, title: i + "" });
    }

    return (
      <View>
        <FlatList
          data={chatItem}
          renderItem={this._renderItem}
          // renderItem={({ index }) => (
          //   <Text
          //     style={{
          //       textAlign: "center",
          //       width: "100%",
          //       height: 100
          //     }}
          //   >
          //     Settings - {index}
          //   </Text>
          // )}
          ItemSeparatorComponent={this._separator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  title: {
    textAlign: "center",
    height: 20,
    fontSize: 14,
    color: "#333333",
    top: 5
  },
  chart: {
    height: 300,
    marginTop: 5,
    marginBottom: 5
  },
  btn: {
    flex: 1,
    justifyContent: "center"
  },
  tip: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
    marginLeft: 10
  }
});
