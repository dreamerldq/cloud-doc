import React, {useState, useEffect } from 'react'
import { Button } from 'antd'
const BottomBtn = ({
    clickButton,
    iconName,
    title,
    colorType
  }) => {
  return(
      <Button icon={iconName} onClick={clickButton} type={colorType}>{title}</Button>
  )
}

export default BottomBtn