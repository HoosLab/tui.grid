
![grid backbone](http://github.nhnent.com/github-enterprise-assets/0000/0089/0000/0154/4511b4f8-7b59-11e4-9c63-be3a4be8dbf9.jpg)

## 개발 날짜
2014-11-06

## 담당자
FE 개발팀 박순영 <soonyoung.park@nhnent.com>

## 설명
- Grid 컴포넌트

## 기능 정의
- Ajax history 기능을 지원한다.

## 데이터 예제
- autoNumbering: true 이고, selectType: checkbox 일 경우
- 서버에서 전송하는 데이터 Sample
```
[
  {
    '_extraData': {
      'rowSpan': {
        'column1': 2
        'column2': 3
      },
      'className': {
          'row': ['rowDesignClass'],
          'column': {
            'column1': ['myDesignClass']
          }
      }
    },
    'column1': 'data1-1',
    'column2': 'data1-2',
    'column3': 'data1-3'
  },
  {
    'column1': 'data2-1',
    'column2': 'data2-2',
    'column3': 'data2-3'
  },
  {
    'column1': 'data3-1',
    'column2': 'data3-2',
    'column3': 'data3-3'
  },
  {
    'column1': 'data4-1',
    'column2': 'data4-2',
    'column3': 'data4-3'
  },
  {
    {
      '_extraData': {
        'rowState': 'CHECKED'
      }
    },
    'column1': 'data5-1',
    'column2': 'data5-2',
    'column3': 'data5-3'
  },
]
```
- 위 데이터를 View 에서 사용하기 전에 1차로 Data.RowList 에서 가공한 데이터 Sample
```
[
  {
    'rowKey': 0,
    '_button': false,
    '_extraData': {
      'rowSpan': {
        'column1': 2
        'column2': 3
      },
      'className': {
          'row': ['rowDesignClass'],
          'column': {
            'column1': ['myDesignClass']
          }
      },
      'rowState': null
      'rowSpanData': {
        'column1': {
          'mainRowKey': 0,
          'isMainRow': true,
          'count': 2
        },
        'column2': {
          'mainRowKey': 0,
          'isMainRow': true,
          'count': 3
        }
      }
    },
    'column1': 'data1-1',
    'column2': 'data1-2',
    'column3': 'data1-3'
  },
  {
    'rowKey': 1,
    '_button': false,
    '_extraData': {
      'rowSpan': null,
      'rowState': null,
      'rowSpanData': {
        'column1': {
          'mainRowKey': 0,
          'isMainRow': false,
          'count': -1
        },
        'column2': {
          'mainRowKey': 0,
          'isMainRow': false,
          'count': -1
        }
      }
    },
    'column1': 'data2-1',
    'column2': 'data2-2',
    'column3': 'data2-3'
  },
  {
    'rowKey': 2,
    '_button': false,
    '_extraData': {
      'rowSpan': null,
      'rowState': null,
      'rowSpanData': {
        'column2': {
          'mainRowKey': 0,
          'isMainRow': false,
          'count': -2
        }
      }
    },
    'column1': 'data3-1',
    'column2': 'data3-2',
    'column3': 'data3-3'
  },
  {
    'rowKey': 3,
    '_button': false,
    '_extraData': {
      'rowSpan': null,
      'rowState': null,
      'rowSpanData': null
    },
    'column1': 'data4-1',
    'column2': 'data4-2',
    'column3': 'data4-3'
  },
  {
    'rowKey': 4,
    '_button': true,
    '_extraData' = {
        'rowSpan': null,
        'rowState': 'CHECKED',
        'rowSpanData': null
      }
    },
    'column1': 'data5-1',
    'column2': 'data5-2',
    'column3': 'data5-3'
  }
]
```
- 1차로 Data.RowList 에서 가공한 데이터를 2차로 Model.RowList 에서 가공한 데이터 Sample
```
[
  {
    'rowKey': 0,
    '_extraData': {
      /*... 동일하므로 생략 ... */
    },
    'column1': {
      rowKey: 0,
      columnName: 'column1',
      value: 'data1-1',
      rowSpan: 2, //  = _extraData.rowSpanData.count 
      isMainRow: true, //  = _extraData.rowSpanData.isMainRow 
      mainRowKey: 0, //  = _extraData.rowSpanData.mainRowKey 
      isEditable: false,
      isDisabled: false,
      optionList: [],   // relation 수행후 데이터 결과값
      className: 'rowDesignClass myDesignClass', // = _extraData.className 에 정의된 값
      /*
      changed :
      참조형 데이터이므로 Backbone의 Change 이벤트에서 변경된 값을 알려줄 수 없어, 
      특정 메서드를 통해 프로퍼티 값을 변경하고, 변경된 프로퍼티 목록들을 을 listener 에게 알려주기 위한 프로퍼티
      */
      changed: []   
    },
    'column2': {
      rowKey: 0,
      columnName: 'column2',
      value: 'data1-2',
      rowSpan: 3, //  = _extraData.rowSpanData.count 
      isMainRow: true, //  = _extraData.rowSpanData.isMainRow 
      mainRowKey: 0, //  = _extraData.rowSpanData.mainRowKey 
      isEditable: false,
      isDisabled: false,
      optionList: [],   // relation 수행후 데이터 결과값
      className: 'rowDesignClass', // = _extraData.className 에 정의된 값
      changed: []   
    },
    'column3': {
      rowKey: 0,
      columnName: 'column3',
      value: 'data1-3',
      rowSpan: 0, //  = _extraData.rowSpanData.count 
      isMainRow: true, //  = _extraData.rowSpanData.isMainRow 
      mainRowKey: 0, //  = _extraData.rowSpanData.mainRowKey 
      isEditable: false,
      isDisabled: false,
      optionList: [],   // relation 수행후 데이터 결과값
      className: 'rowDesignClass', // = _extraData.className 에 정의된 값
      changed: []   
    },
    '_button': {
      rowKey: 0,
      columnName: '_button',
      value: false,
      rowSpan: 0, //  = _extraData.rowSpanData.count 
      isMainRow: true, //  = _extraData.rowSpanData.isMainRow 
      mainRowKey: 0, //  = _extraData.rowSpanData.mainRowKey 
      isEditable: false,
      isDisabled: false,
      optionList: [],   // relation 수행후 데이터 결과값
      className: 'rowDesignClass', // = _extraData.className 에 정의된 값
      changed: []   
    }
  }
  /** 이하 생략.. **/
]
```
## 샘플 페이지
https://github.nhnent.com/pages/fe/application-grid/tutorial-sample1.html

## 다운로드
## API 문서
## 적용된 페이지
## 개선 해야할 기능
- Net: 한페이지에서 두개 이상의 그리드에서 ajaxHistory 사용 가능하도록 개선 해야함. 현재 페이지당 한개 그리드에서만 사용 가능.

## 추가 해야할 기능 (TODO)
- Core#disable: 전체 영역 disable
- Core#enable: 전체 영역 enable
- Core#refreshLayout: 그리드 엘리먼트가 숨겨진(display:block) 상태에서 초기화된 상태에서 사용자 의도에 따라 노출되었을 때, 각 columnWidth 와 그리드 height 를 다시 계산 하는 기능
- Core#setGridSize: 그리드의 전체 사이즈를 조정하는 메서드.
- Core#setScrollBarPosition: 수직/수평 스크롤바 핸들러 위치를 설정하는 메서드.
- Core#setGridSize: 그리드의 전체 사이즈를 조정하는 메서드.
- Core: _extraData rowSpanTo 기능: 추가하려는 행 데이터에 rowSpanTo 데이터가 설정이 되어 있는 경우에는 내부 데이터에서 해당 행을 찾은 뒤에 추가해 준다.
- Core: removeRow 시 rowSpan 된 행들에 대해 함께 삭제하던지, rowSpan 을 제거하고 삭제 할건지 결정하고 구현 해야함.
- Core: 데이터 수정후 unloadCheck 얼럿 메세지 기능
- Core: 데이터 Ctrl + V 붙여넣기 기능
- Net#downloadData : 현재 페이지 데이터 다운로드 하는 기능
- Net#downloadAllData : 전체 데이터 다운로드 하는 기능

## 제거된 기능
- Core#getDisabledRowKeyList: cell 별로 disabled 될 수도 있어 판단하기 어렵고, 활용 빈도가 낮을것으로 예상되어 제거함.
- Net: CheckValidation, InvalidItem 기능 제거.
