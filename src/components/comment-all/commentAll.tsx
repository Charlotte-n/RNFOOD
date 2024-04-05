import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { FoodCommentListData } from '../../apis/types/food'
import AutoText from '../auto-text'
import theme from '../../styles/theme/color'

interface IProps {
    children?: ReactNode
    comments: FoodCommentListData
    width: number
}

const CommentAll: FC<IProps> = ({ comments, width }) => {
    return (
        <View>
            {/*    用户的评论*/}
            {comments?.length
                ? comments.map((item) => (
                      <View
                          key={item.id}
                          className="flex-row pl-[5] pr-[5] mt-[20]"
                      >
                          {item.avatar ? (
                              <Image
                                  source={{ uri: item.avatar }}
                                  style={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: 100,
                                  }}
                                  resizeMode={'cover'}
                              ></Image>
                          ) : (
                              <Image
                                  source={require('../../../assets/images/bg_login_header.png')}
                                  style={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: 100,
                                  }}
                                  resizeMode={'cover'}
                              ></Image>
                          )}

                          <View className="ml-[10] flex-1">
                              {/*自己的展示*/}
                              <View className="w-[200]">
                                  <AutoText
                                      numberOfLines={1}
                                      fontSize={5.5}
                                      style={{
                                          color: '#cccccc',
                                          marginBottom: 10,
                                      }}
                                  >
                                      {item.username}
                                  </AutoText>
                                  <TouchableOpacity onPress={() => {}}>
                                      <AutoText fontSize={4.8}>
                                          {item.content}
                                      </AutoText>
                                  </TouchableOpacity>
                              </View>
                              {/*    回复的展示*/}
                              {item.children.length ? (
                                  <View className="mt-[10] flex-row">
                                      {item.children[0].avatar ? (
                                          <Image
                                              source={{
                                                  uri: item.children[0].avatar,
                                              }}
                                              style={{
                                                  width: 25,
                                                  height: 25,
                                                  borderRadius: 100,
                                              }}
                                          ></Image>
                                      ) : (
                                          <Image
                                              source={require('../../../assets/images/bg_login_header.png')}
                                              style={{
                                                  width: 25,
                                                  height: 25,
                                                  borderRadius: 100,
                                              }}
                                              resizeMode={'cover'}
                                          ></Image>
                                      )}

                                      <View className="relative top-1 ml-[5] flex-1">
                                          <AutoText
                                              numberOfLines={1}
                                              fontSize={4.3}
                                              style={{
                                                  color: '#cccccc',
                                                  marginBottom: 5,
                                              }}
                                          >
                                              {item.children[0].username}
                                          </AutoText>
                                          <AutoText fontSize={4.3}>
                                              {item.children[0].content}
                                          </AutoText>
                                          {item.children.length > 1 ? (
                                              <TouchableOpacity className="mt-[5]">
                                                  <AutoText
                                                      fontSize={4.3}
                                                      style={{
                                                          color: theme.colors
                                                              .deep01Primary,
                                                      }}
                                                  >
                                                      查看全部 (
                                                      {item.children.length})
                                                  </AutoText>
                                              </TouchableOpacity>
                                          ) : null}
                                      </View>
                                      <TouchableOpacity>
                                          {item.children[0]?.isLike ? (
                                              <View className="flex-row items-center justify-center">
                                                  <Image
                                                      style={{
                                                          width: 15,
                                                          height: 15,
                                                          marginTop: 28,
                                                          marginRight: 5,
                                                      }}
                                                      source={require('../../../assets/icon/zan2.png')}
                                                  ></Image>
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          marginTop: 28,
                                                      }}
                                                  >
                                                      {item.children[0].likeNum
                                                          ? item.children[0]
                                                                .likeNum
                                                          : 0}
                                                  </AutoText>
                                              </View>
                                          ) : (
                                              <View className="flex-row items-center justify-center">
                                                  <Image
                                                      style={{
                                                          width: 15,
                                                          height: 15,
                                                          marginTop: 28,
                                                          marginRight: 5,
                                                      }}
                                                      source={require('../../../assets/icon/zan1.png')}
                                                  ></Image>
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          marginTop: 28,
                                                      }}
                                                  >
                                                      {item.children[0].likeNum
                                                          ? item.children[0]
                                                                .likeNum
                                                          : 0}
                                                  </AutoText>
                                              </View>
                                          )}
                                      </TouchableOpacity>
                                  </View>
                              ) : null}
                          </View>
                          <TouchableOpacity>
                              {item.isLike ? (
                                  <View className="flex-row items-center">
                                      <Image
                                          style={{
                                              width: 20,
                                              height: 20,
                                              marginTop: 25,
                                              marginRight: 5,
                                          }}
                                          source={require('../../../assets/icon/zan2.png')}
                                      ></Image>
                                      <AutoText
                                          fontSize={4}
                                          style={{
                                              marginTop: 25,
                                          }}
                                      >
                                          {item.likeNum ? item.likeNum : 0}
                                      </AutoText>
                                  </View>
                              ) : (
                                  <View className="flex-row items-center">
                                      <Image
                                          style={{
                                              width: 20,
                                              height: 20,
                                              marginTop: 25,
                                              marginRight: 5,
                                          }}
                                          source={require('../../../assets/icon/zan1.png')}
                                      ></Image>
                                      <AutoText
                                          fontSize={4}
                                          style={{
                                              marginTop: 25,
                                          }}
                                      >
                                          {item.likeNum ? item.likeNum : 0}
                                      </AutoText>
                                  </View>
                              )}
                          </TouchableOpacity>
                      </View>
                  ))
                : null}
        </View>
    )
}

export default memo(CommentAll)
