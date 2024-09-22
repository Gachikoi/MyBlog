# 视图灵活性
- HStack&VStack首先为最不灵活的视图提供空间，其灵活度取决于内部的视图。如果内部有非常灵活的视图，如Spacer（），则HS&VS也会变得非常灵活。
- GeometryReader会占据提供给他的所有空间
- Lazy开头的视图不会绘制屏幕之外的事物，通常与ScroolView同时使用
- ZStack和HS&VS一样，灵活度取决于最灵活的子视图
- 并且由于Lazy的视图不会绘制屏幕外的事物，so they aren't flexible, or they will be giant when they have very flexibel 子视图

# Animation
- transiton修饰View时会修饰整体的View，而隐式animation会将效果分配到所有子视图上，而非整体
- withAnimation {
    // 在这里修改视图属性，例如位置、大小、颜色等
    // SwiftUI 将自动为这些属性的变化添加动画效果
}
- swift中Text不支持动画效果。但是可以通过Text(...).id(...).transition(...)来将不同text的切换用id辨别视作过渡，然后就可以生成动画效果

# Button
button不适用的modifier：.onLongPressGesture,推测可能和button本身就可以长按的属性有冲突