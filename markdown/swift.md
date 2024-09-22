# 基础部分
## 整数和浮点数转换
- 结合数字类常量和变量不同于结合数字类字面量。字面量 3 可以直接和字面量 0.14159 相加，因为数字字面量本身没有明确的类型。它们的类型只在编译器需要求值的时候被推测。但let a=3；let b=0.14159;后a和b想加必用强制类型转换
- 进行强制类型转换时，浮点数会被截断。 4.75 会变成 4，-3.9 会变成 -3

## 字符串和字符
### 使用字符
- 你可通过for-in循环来遍历字符串
```
for character in "Dog!🐶" {
    print(character)
}
// D
// o
// g
// !
// 🐶
```
### 字符串小知识
- 用String原生的index方法访问字符串是非常费时的，不如转化为Character数组来使用普通下标进行访问

## 各种标准库函数使用方法
- print(_:separator:terminator:)
```
func print(
    _ items: Any...,
    separator: String = " ",
    terminator: String = "\n"
)
```
>Parameters
>>items
Zero or more items to print.

>>separator
A string to print between each item. The default is a single space (" ").

>>terminator
The string to print after all items have been printed. The default is a newline ("\n").

## 函数
func test(_ insert_int:Int)->Int
{
    
}
func test2(outname, inname:Int)->Int
{

}
func test3(name:Int)->Int
{

}
test(1);test2(outname:2);test3(name:3)
- outname为外部名称，inname为内部名称；可以用_省略outname，inname不能省略

## 结构体
- 结构体实例之间赋值是值传递，而类是引用传递
- swift可以用@Published检测struct是否发生改变，而无法检测class

# 闭包
## 自动闭包
```swift
// customersInLine is ["Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))
// 打印“Now serving Ewa!”
```
## 非自动闭包需要将实参加上{}
```swift
// customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
// 打印出“Now serving Alex!”
```
## 自动逃逸闭包需要在`@autoclosure`后面加上`@escaping`

# Enum
## 定义
枚举是值类型
```swift
enum CompassPoint {
	case north
	case south
	case east
	case west
}
```
>与 C 和 Objective-C 不同，Swift 的枚举成员在被创建时不会被赋予一个默认的整型值。在上面的 CompassPoint 例子中，north，south，east 和 west 不会被隐式地赋值为 0，1，2 和 3。相反，这些枚举成员本身就是完备的值，这些值的类型是已经明确定义好的 `CompassPoint` 类型。
## 关联值
```swift
switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case .qrCode(let productCode):
    print("QR code: \(productCode).")
}
// 打印“QR code: ABCDEFGHIJKLMNOP.”

//如果一个枚举值的所有关联值都被提取为常量/变量，则可以将let/var提取到前面
switch productBarcode {
case let .upc(numberSystem, manufacturer, product, check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case let .qrCode(productCode):
    print("QR code: \(productCode).")
}
// 打印“QR code: ABCDEFGHIJKLMNOP.”
```
## 原始值
### 显式赋值
```swift
enum ASCIIControlCharacter: Character {
    case tab = "\t"
    case lineFeed = "\n"
    case carriageReturn = "\r"
}
```
### 隐式赋值
```swift
//如果第一个枚举成员没有设原始值，其原始值将为0，随后+1递增
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}

//当enum为string类型时，枚举值的原始值被初始化为自己的变量名
enum CompassPoint: String {
    case north, south, east, west
}

//rawvalue访问原始值
let earthsOrder = Planet.earth.rawValue
// earthsOrder 值为 3
let sunsetDirection = CompassPoint.west.rawValue
// sunsetDirection 值为 "west"
```
### 使用原始值初始化枚举实例
```swift
let possiblePlanet = Planet(rawValue: 7)
// possiblePlanet 类型为 Planet? 值为 Planet.uranus
```
> 枚举的初始化器是可失败构造器。如果找不到rawValue为7的Planet枚举，则会返回nil
## 递归枚举
- 枚举的关联值包含该枚举类型时，应在enum的此case前加上`indirect`关键字
- 如果所有case全可递归，则在enum前加上`indirect`
- 下面为操作实例
```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}

let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))

func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case let .number(value):
        return value
    case let .addition(left, right):
        return evaluate(left) + evaluate(right)
    case let .multiplication(left, right):
        return evaluate(left) * evaluate(right)
    }
}

print(evaluate(product))
// 打印“18”
```

# 类和结构体
- 结构体有一个自动生成的成员逐一构造器，而类没有默认构造器
- 使用===/！==来判断两个常量/变量是否引用了同一个实例
- 如果创建了一个结构体实例并将其赋值给一个常量，则无法修改该实例的任何属性，即使被声明为可变属性也不行
```swift
let rangeOfFourItems=FixedLengthRange(firstValue:0,length:4)
error:rangeOfFourItems.firstValue=6
```

# 属性
## 延时加载存储属性
- 在属性声明前加上lazy关键字
> 必须将延时加载属性声明成var，因为其初始值可能在instance构造完成后才会得到。而常量属性在instance构造完成前必须有初始值，因此无法声明成延时加载
- lazy var只有第一次被访问时才被创建
```swift
print(manager.importer.fileName)
// DataImporter 实例的 importer 属性现在被创建了
// 输出“data.txt”
```
> 如果一个被标记为 lazy 的属性在没有初始化时就同时被多个线程访问，则无法保证该属性只会被初始化一次。
## 观察属性
>如果将带有观察器的属性通过 in-out 方式传入函数，willSet 和 didSet 也会调用。这是因为 in-out 参数采用了拷入拷出内存模式：即在函数内部使用的是参数的 copy，函数结束后，又对参数重新赋值
```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("将 totalSteps 的值设置为 \(newTotalSteps)")
        }
        didSet {
            //if totalSteps > oldValue  {
                print("增加了 \(totalSteps - oldValue) 步")
            //}
        }
    }
    
    func test(totalSteps: inout Int)->Void{
        
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// 将 totalSteps 的值设置为 200
// 增加了 200 步
stepCounter.totalSteps = 360
// 将 totalSteps 的值设置为 360
// 增加了 160 步
stepCounter.totalSteps = 896
// 将 totalSteps 的值设置为 896
// 增加了 536 步
stepCounter.test(totalSteps: &stepCounter.totalSteps)
// 将 totalSteps 的值设置为 896
// 增加了 0 步
```
## 属性包装器
定义一个属性包装器，你需要创建一个定义private var wrappedValue 属性的结构体、枚举或者类。  
可选定义private(set) var projectedValue作为属性被呈现值,通过`类型实例名.$类型实例中被包装的属性名`来实现访问。
```swift
@propertyWrapper
struct SmallNumber {
    private var number: Int
    private(set) var projectedValue: Bool

    var wrappedValue: Int {
        get { return number }
        set {
            if newValue > 12 {
                number = 12
                projectedValue = true
            } else {
                number = newValue
                projectedValue = false
            }
        }
    }

    init() {
        self.number = 0
        self.projectedValue = false
    }
}
struct SomeStructure {
    @SmallNumber var someNumber: Int
}
var someStructure = SomeStructure()

someStructure.someNumber = 4
print(someStructure.$someNumber)
// 打印 "false"

someStructure.someNumber = 55
print(someStructure.$someNumber)
// 打印 "true"
```

当你把一个包装器应用到一个属性上时，编译器将合成提供包装器存储空间和通过包装器访问属性的代码。（属性包装器只负责存储被包装值，所以没有合成这些代码。）不利用这个特性语法的情况下，你可以写出使用属性包装器行为的代码。举例来说，这是先前代码清单中的 SmallRectangle 的另一个版本。这个版本将其属性明确地包装在 TwelveOrLess 结构体中，而不是把 @TwelveOrLess 作为特性写下来：
```swift
struct SmallRectangle {
    private var _height = TwelveOrLess()
    private var _width = TwelveOrLess()
    var height: Int {
        get { return _height.wrappedValue }
        set { _height.wrappedValue = newValue }
    }
    var width: Int {
        get { return _width.wrappedValue }
        set { _width.wrappedValue = newValue }
    }
}
```
当属性包装器的内部没有给变量设置初始值时或需要根据外部情况设定初始值时，则必须在属性包装器内建立初始化器。  
为属性指定初始值时，swift使用你建立的`init(wrapppedValue:)`构造器来设置包装器。
```swift
struct UnitRectangle {
    @SmallNumber var height: Int = 1
    @SmallNumber var width: Int = 1
}

var unitRectangle = UnitRectangle()
print(unitRectangle.height, unitRectangle.width)
// 打印 "1 1"
```
当你在自定义特性后面把实参写在括号里时，Swift 使用接受这些实参的构造器来设置包装器。举例来说，如果你提供初始值和最大值，Swift 使用 init(wrappedValue:maximum:) 构造器:
```swift
struct NarrowRectangle {
    @SmallNumber(wrappedValue: 2, maximum: 5) var height: Int
    @SmallNumber(wrappedValue: 3, maximum: 4) var width: Int
}
```


## 全局变量和局部变量
>注意  
全局的常量或变量都是延迟计算的，跟 延时加载存储属性 相似，不同的地方在于，全局的常量或变量不需要标记 lazy 修饰符。  
局部范围的常量和变量从不延迟计算。 

可以在局部存储型变量上使用属性包装器，但不能在全局变量或者计算型变量上使用
>这并不意味着lazy和属性包装器互斥。   

>全局变量是在全局作用域中声明的变量，可以在任何地方访问。它们的生命周期与应用程序的生命周期相同，不依赖于任何特定类型的实例。全局变量的特性不支持属性包装器提供的实例级别的行为和状态管理。

# 方法
```
在 Swift 中，方法（Method）和函数（Function）是两个相关但稍有不同的概念。

方法（Method）是与特定类型关联的函数。它们定义在类、结构体、枚举等类型中，并用于操作和访问这些类型的实例。方法可以访问类型中的属性和其他方法，并可以通过使用隐式的 self 关键字引用当前实例。

函数（Function）是独立于特定类型的代码块，可以在任何地方定义和调用。函数是一段可重用的代码，用于执行特定的任务，并可以接受参数和返回值。函数可以是全局函数（定义在全局作用域中）或嵌套函数（定义在其他函数内部）。
```
## self属性
类型的每一个实例都有一个隐含属性叫做 self，self 完全等同于该实例本身。
## 在可变方法中给self赋值，创建了一个新的结构体实例
可变方法能够赋给隐含属性 self 一个全新的实例。上面 Point 的例子可以用下面的方式改写：
```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```
## 类型方法
在类型方法的方法体（body）中，self 属性指向这个类型本身，而不是类型的某个实例。

# 下标
下标使用实例
```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            //使用断言assert
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}

var matrix = Matrix(rows: 2, columns: 2)

matrix[0, 1] = 1.5
matrix[1, 0] = 3.2

let someValue = matrix[2, 2]
// 断言将会触发，因为 [2, 2] 已经超过了 matrix 的范围
```

# 继承
## 重写属性
你可以提供定制的 getter（或 setter）来重写任何一个继承来的属性，无论这个属性是存储型还是计算型属性。子类并不知道继承来的属性是存储型的还是计算型的，它只知道继承来的属性会有一个名字和类型。你在重写一个属性时，必须将它的名字和类型都写出来。这样才能使编译器去检查你重写的属性是与超类中同名同类型的属性相匹配的。

你可以将一个继承来的只读属性重写为一个读写属性，只需要在重写版本的属性里提供 getter 和 setter 即可。  
`但是，你不可以将一个继承来的读写属性重写为一个只读属性。`
## 防止重写
可以通过在关键字 class 前添加 final 修饰符（final class）来将整个类标记为 final 。这样的类是不可被继承的。

你可以通过把方法，属性或下标标记为 
final
 来防止它们被重写

 # 构造过程
 ## 可选属性类型的构造
可选类型在构造过程中将会自动初始化为nil。
即使在init中将给可选类型赋值，在赋值之前可选类型的值就已经初始化为nil了。
```swift
class SurveyQuestion {
    var text: String
    var response: String?
    init(text: String,response:String) {
        print(self.text) //error:Variable 'self.text' used before being initialized
        self.text = text
        print(self.response ?? "0")
        // 0
        self.response=response
        print(self.response ?? "0")
        // a
    }
}

let cheeseQuestion = SurveyQuestion(text: "Do you like cheese?",response: "a")
```
## 默认构造器
如果结构体或类为所有属性提供了默认值，又没有提供任何自定义的构造器，那么 Swift 会给这些结构体或类提供一个默认构造器。这个默认构造器将简单地创建一个所有属性值都设置为它们默认值的实例。
## 结构体的逐一成员构造器
结构体如果没有定义任何自定义构造器，它们将自动获得一个逐一成员构造器（memberwise initializer）。不像默认构造器，即使存储型属性没有默认值，结构体也会获得逐一成员构造器。
## 值类型的构造器代理
请注意，如果你为某个值类型定义了一个自定义的构造器，你将无法访问到默认构造器（如果是结构体，还将无法访问逐一成员构造器）。这种限制避免了在一个更复杂的构造器中做了额外的重要设置，但有人不小心使用自动生成的构造器而导致错误的情况。
>注意  
假如你希望默认构造器、逐一成员构造器以及你自己的自定义构造器都能用来创建实例，可以将自定义的构造器写到扩展（extension）中，而不是写在值类型的原始定义中。  
但是你可以在设置属性的初始值的同时，保留一个init(){}，以在有其他构造器的情况下保留默认构造器的功能。
## 构造器的继承和重写
子类可以在构造过程修改继承来的变量属性，但是不能修改继承来的常量属性。
## 类的继承和构造
- 类倾向于拥有极少的指定构造器，普遍的是一个类只拥有一个指定构造器。但也可以有多个。一个类至少有一个指定构造器。
- 便利构造器是类中比较次要的、辅助型的构造器。你可以定义便利构造器来调用同一个类中的指定构造器，并为部分形参提供默认值。你也可以定义便利构造器来创建一个特殊用途或特定输入值的实例。
- 当你在编写一个和父类中`指定构造器`相匹配的子类构造器时，你实际上是在重写父类的这个指定构造器。因此，你必须在定义子类构造器时带上 override 修饰符。即使你重写的是系统自动提供的默认构造器，也需要带上 override 修饰符。
- 相反，如果你编写了一个和父类便利构造器相匹配的子类构造器，由于子类不能直接调用父类的便利构造器，因此，严格意义上来讲，你的子类并未对一个父类构造器提供重写。最后的结果就是，你在子类中“重写”一个父类便利构造器时，不需要加 override 修饰符。  

 Bicycle 的构造器 init() 以调用 super.init() 方法开始，这个方法的作用是调用 Bicycle 的父类 Vehicle 的默认构造器。这样可以确保 Bicycle 在修改属性之前，它所继承的属性 numberOfWheels 能被 Vehicle 类初始化。在调用 super.init() 之后，属性 numberOfWheels 的原值被新值 2 替换。
```swift
class Bicycle: Vehicle {
    override init() {
        super.init()
        numberOfWheels = 2
    }
}
```
如果在`numberOfWheels`后再调用`super.init()`，则`numberOfWheels`会按`Vehicle`父类中的构造器来初始化。

如果子类的构造器不需要设置一个值来覆盖父类中的属性的值，则super.init()放在哪里都无所谓。

如果子类的构造器没有在阶段 2 过程中做`自定义操作`，并且父类有一个同步、无参数的指定构造器，你可以在所有子类的存储属性赋值之后省略 super.init() 的调用。若父类有一个异步的构造器，你就需要明确地写入 await super.init()。
>`自定义操作`通常指在调用super.init()后子类的构造器进行的操作.

如果子类的构造器没有在阶段 2 过程中做自定义操作，并且父类有一个同步、无参数的指定构造器，你可以在所有子类的存储属性赋值之后省略 super.init() 的调用。若父类有一个异步的构造器，你就需要明确地写入 await super.init()。
```
规则 1
    如果子类没有定义任何指定构造器，它将自动继承父类所有的指定构造器。

规则 2
    如果子类提供了所有父类指定构造器的实现——无论是通过规则 1 继承过来的，还是提供了自定义实现——它将自动继承父类所有的便利构造器。

即使你在子类中添加了更多的便利构造器，这两条规则仍然适用。
```
## 可失败构造器
你可以用非可失败构造器重写可失败构造器，但反过来却不行。
## 必要构造器
在子类重写父类的必要构造器时，必须在子类的构造器前也添加 required 修饰符，表明该构造器要求也应用于继承链后面的子类。在重写父类中必要的指定构造器时，不需要添加 override 修饰符。
> 如果子类继承的构造器能满足必要构造器的要求，则无须在子类中显式提供必要构造器的实现。
## 通过闭包设置默认值
下面模板介绍了如何用闭包为属性提供默认值：

```swift
class SomeClass {
    let someProperty: SomeType = {
        // 在这个闭包中给 someProperty 创建一个默认值
        // someValue 必须和 SomeType 类型相同
        return someValue
    }()
}
注意闭包结尾的花括号后面接了一对空的小括号。这用来告诉 Swift 立即执行此闭包。如果你忽略了这对括号，相当于将闭包本身作为值赋值给了属性，而不是将闭包的返回值赋值给属性。
```
>注意  
如果你使用闭包来初始化属性，请记住在闭包执行时，实例的其它部分都还没有初始化。这意味着你不能在闭包里访问其它属性，即使这些属性有默认值。同样，你也不能使用隐式的 self 属性，或者调用任何实例方法。
## 析构器deinit
析构器只适用于类类型，当一个类的实例被释放之前，析构器会被立即调用。

Swift 会自动释放不再需要的实例以释放资源。但是，当使用自己的资源时，你可能需要进行一些额外的清理。例如，如果创建了一个自定义的类来打开一个文件，并写入一些数据，你可能需要在类实例被释放之前手动去关闭该文件。

在类的定义中，每个类最多只能有一个析构器。

析构器是在实例释放发生前被自动调用的。你不能主动调用析构器。子类继承了父类的析构器，并且在子类析构器实现的最后，父类的析构器会被自动调用。即使子类没有提供自己的析构器，父类的析构器也同样会被调用。

# 可选链
可选链式调用的的返回值都是可选的
如：
```
john.residence?.numberOfRooms
```
即使`numberOfRooms`是非可选的，其在可选链式调用中仍会返回一个可选类型(比如：Int?)

无论链式调用的最后一个属性/方法等元素是不是可选属性，都不用在结尾加上？
即使是返回可选值的方法，在非最后位置时也要在结尾的括号后加上问好，如：
```
 john.residence?.address?.buildingIdentifier()?.hasPrefix("The")
```

# defer
你可以使用 defer 语句在即将离开当前代码块时执行一系列语句。该语句让你能执行一些必要的清理工作，不管是以何种方式离开当前代码块的——无论是由于抛出错误而离开，或是由于诸如 return、break 的语句。例如，你可以用 defer 语句来确保文件描述符得以关闭，以及手动分配的内存得以释放。

defer 语句将代码的执行延迟到当前的作用域退出之前。该语句由 defer 关键字和要被延迟执行的语句组成。延迟执行的语句不能包含任何控制转移语句，例如 break、return 语句，或是抛出一个错误。延迟执行的操作会按照它们声明的顺序从后往前执行——也就是说，第一条 defer 语句中的代码最后才执行，第二条 defer 语句中的代码倒数第二个执行，以此类推。最后一条语句会第一个执行。

# 类型转换
## 检查类型
用类型检查操作符（is）来检查一个实例是否属于特定子类型。若实例属于那个子类型，类型检查操作符返回 true，否则返回 false。
## 向下转型
某类型的一个常量或变量可能在幕后实际上属于一个子类。当确定是这种情况时，你可以尝试用类型转换操作符（as? 或 as!）向下转到它的子类型。

因为向下转型可能会失败，类型转型操作符带有两种不同形式。条件形式 as? 返回一个你试图向下转成的类型的可选值。强制形式 as! 把试图向下转型和强制解包转换结果结合为一个操作。
## Any 和 AnyObject 的类型转换
Swift 为不确定类型提供了两种特殊的类型别名：

- Any 可以表示任何类型，包括函数类型。

- AnyObject 可以表示任何类类型的实例。

你可以在 switch 表达式的 case 中使用 is 和 as 操作符来找出只知道是 Any 或 AnyObject 类型的常量或变量的具体类型。下面的示例迭代 things 数组中的每一项，并用 switch 语句查找每一项的类型。有几个 switch 语句的 case 绑定它们匹配到的值到一个指定类型的常量，从而可以打印这些值：
```swift
for thing in things {
    switch thing {
    case 0 as Int:
        print("zero as an Int")
    case 0 as Double:
        print("zero as a Double")
    case let someInt as Int:
        print("an integer value of \(someInt)")
    case let someDouble as Double where someDouble > 0:
        print("a positive double value of \(someDouble)")
    case is Double://区分
        print("some other double value that I don't want to print")
    case let someString as String://区分(这里是模式变量绑定)
        print("a string value of \"\(someString)\"")
    case let (x, y) as (Double, Double):
        print("an (x, y) point at \(x), \(y)")
    case let movie as Movie:
        print("a movie called \(movie.name), dir. \(movie.director)")
    case let stringConverter as (String) -> String:
        print(stringConverter("Michael"))
    default:
        print("something else")
    }
}
//这里的as语意就和is类似了
//但是使用let进行值绑定时(Pattern variable binding 模式变量绑定)还是要用as，不能用is
```
## 使用as?实现可选绑定
```swift
if let movie = item as? Movie {

}
```
# 扩展
扩展可以给现有的类型添加新的构造器。它使你可以把自定义类型作为参数来供其他类型的构造器使用，或者在类型的原始实现上添加额外的构造选项。

扩展可以给一个类添加新的便利构造器，但是它们不能给类添加新的指定构造器或者析构器。指定构造器和析构器必须始终由类的原始实现提供。

# 协议
协议总是用 var 关键字来声明变量属性，在类型声明后加上 { set get } 来表示属性是可读可写的，可读属性则用 { get } 来表示。

如果协议只要求属性是可读的，那么该属性不仅可以是可读的，如果代码需要的话，还可以是可写的。

在协议中定义类型属性/方法时，总是使用 static 关键字作为前缀。当类类型遵循协议时，除了 static 关键字，还可以使用 class 关键字来声明类型属性/方法。

协议可以要求遵循协议的类型实现指定的构造器。你可以像编写普通构造器那样，在协议的定义里写下构造器的声明，但不需要写花括号和构造器的实体。

实现协议构造器时，构造器前必须加上required修饰符。父类实现协议时，继承父类的子类也一样需要实现required构造器。

如果一个子类重写了父类的指定构造器，并且该构造器满足了某个协议的要求，那么该构造器的实现需要同时标注 required 和 override 修饰符（required在前）。
>注意  
如果类已经被标记为 final，那么不需要在协议构造器的实现中使用 required 修饰符，因为 final 类不能有子类。

遵循协议的类型可以通过可失败构造器（init?）或非可失败构造器（init）来满足协议中定义的可失败构造器要求。协议中定义的非可失败构造器要求可以通过非可失败构造器（init）或隐式解包可失败构造器（init!）来满足。
## 协议可以像其他普通类型（Int、Float...）一样使用
> 注意，是`类型`，而不是`类型实例`
```swift
protocol RandomNumberGenerator{

}
let generator: RandomNumberGenerator
//所有符合RNG类型的实例都可以赋值给generator属性
```
## 委托
委托是一种设计模式，它允许类或结构体将一些需要它们负责的功能委托给其他类型的实例。委托模式的实现很简单：定义协议来封装那些需要被委托的功能，这样就能确保遵循协议的类型能提供这些功能。委托模式可以用来响应特定的动作，或者接收外部数据源提供的数据，而无需关心外部数据源的类型。

下面的例子定义了两个基于骰子游戏的协议：

```swift
protocol DiceGame {
    var dice: Dice { get }
    func play()
}
protocol DiceGameDelegate {
    func gameDidStart(_ game: DiceGame)
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int)
    func gameDidEnd(_ game: DiceGame)
}
```
## 使用合成实现来采纳协议
Swift 可以自动提供一些简单场景下遵循 Equatable、Hashable 和 Comparable 协议的实现。在使用这些合成实现之后，无需再编写重复的代码来实现这些协议所要求的方法。

Swift 为以下几种自定义类型提供了 Equatable 协议的合成实现：

- 遵循 Equatable 协议且只有存储属性的结构体。

- 遵循 Equatable 协议且只有关联类型的枚举

- 没有任何关联类型的枚举

Swift 为以下几种自定义类型提供了 Hashable 协议的合成实现：

- 遵循 Hashable 协议且只有存储属性的结构体。

- 遵循 Hashable 协议且只有关联类型的枚举

- 没有任何关联类型的枚举

Swift 为没有原始值的枚举类型提供了 Comparable 协议的合成实现。如果枚举类型包含关联类型，那这些关联类型也必须同时遵循 Comparable 协议。在包含原始枚举类型声明的文件中声明其对 Comparable 协议的遵循，可以得到 < 操作符的合成实现，且无需自己编写任何关于 < 的实现代码。Comparable 协议同时包含 <=、> 和 >= 操作符的默认实现。
## 类专属的协议
你通过添加 AnyObject 关键字到协议的继承列表，就可以限制协议只能被类类型遵循（而不能是结构体类型或者枚举类型）。

```swift
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // 这里是类专属协议的定义部分
}
```
在以上例子中，协议 SomeClassOnlyProtocol 只能被类类型采纳。如果尝试让结构体或枚举类型采纳 SomeClassOnlyProtocol，则会导致编译时错误。
## 检查协议一致性
使用is/as
## 可选的协议要求
在前面加上`optional`。

可选要求用在你需要和 Objective-C 打交道的代码中。协议和可选要求都必须带上 @objc 属性。标记 @objc 特性的协议只能被继承自 Objective-C 类的类或者 @objc 类遵循，其他类以及结构体和枚举均不能遵循这种协议。
## 结构体、枚举、类可以在扩展中声明自己遵循新的协议，但是不能在扩展中声明一个协议继承自另一个协议。协议的继承只能在协议声明处进行指定。
## 提供默认实现
可以通过协议扩展来为协议要求的方法、计算属性提供默认的实现。如果遵循协议的类型为这些要求提供了自己的实现，那么这些自定义实现将会替代扩展中的默认实现被使用。
## 为协议扩展添加限制条件
在扩展协议的时候，可以指定一些限制条件，只有遵循协议的类型满足这些限制条件时，才能获得协议扩展提供的默认实现。这些限制条件写在协议名之后，使用 where 子句来描述

# 泛型
## associatedtype
```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```
使用关联类型可以让你在协议定义方法的同时不用关心某些特定类型

当某类型遵循Container协议时，可以使用例如`associatedtype Item Int`来指定Item的类型，也可以根据协议定义的方法的具体实现来让swift推断associatedtype的具体类型，而不用写上面的代码。
## 给关联类型添加约束
例如：
```swift
associatedtype Item: Equatable
```
## 具有泛型 Where 子句的扩展
```swift
extension Container where Item == Int {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
}
extension Container where Item: Equatable {
    func endsWith(_ item: Item) -> Bool {
        return count >= 1 && self[count-1] == item
    }
}
```
## 包含上下文关系的 where 分句
```swift
extension Container {
    func average() -> Double where Item == Int {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
    func endsWith(_ item: Item) -> Bool where Item: Equatable {
        return count >= 1 && self[count-1] == item
    }
}
let numbers = [1260, 1200, 98, 37]
print(numbers.average())
// 输出 "648.75"
print(numbers.endsWith(37))
// 输出 "true"
```
这样可以少写一个扩展

# 不透明类型
不透明类型可以使返回值不暴露给外界
## 不透明类型和协议类型的区别
```swift
//返回不透明类型
func flip<T: Shape>(_ shape: T) -> some Shape {
    rif shape is Square {
        return shape // 错误：返回类型不一致
    }
    return FlippedShape(shape: shape) // 错误：返回类型不一致
}
//返回协议类型
func protoFlip<T: Shape>(_ shape: T) -> Shape {
    if shape is Square {
        return shape
    }

    return FlippedShape(shape: shape)
}
```
flip中，不同处返回的返回类型应该是一样的，都是符合Shape协议的一种具体类型。
protoFlip中，不同处返回的返回类型可以不同，有的可以是Rectangle，也可以是Circle，只要符合Shape协议即可。

Shape比some Shape对于返回值的要求更松，但是也是有代价的。

比如，由于协议类型返回值的不确定性，两个相同实例使用protoFlip方法所产生的返回值是无法进行比较的，因为swift无法判断两个返回值是否属于同一类型。而不透明类型可以。
```swift
let protoFlippedTriangle = protoFlip(smallTriangle)
let sameThing = protoFlip(smallTriangle)
protoFlippedTriangle == sameThing  // 错误
```

并且这种方法无法嵌套进行变换形状的操作

<mark>但是很奇怪，我试了下能正常运行，求解  
```swift
protoFlip(protoFlip(smallTriangle))
//非法！
```

不透明类型保留了底层类型的唯一性。Swift 能够推断出关联类型，这个特点使得作为函数返回值，不透明类型比协议类型有更大的使用场景。

# 自动引用计数
## 弱引用
当弱引用的对象被销毁时，ARC会自动设置弱引用为nil。

当 ARC 设置弱引用为 nil 时，属性观察不会被触发。
## 无主引用
和弱引用不同，无主引用通常都被期望拥有值。所以，将值标记为无主引用不会将它变为可选类型，ARC 也不会将无主引用的值设置为 nil。

使用无主引用，你必须确保引用始终都指向一个未销毁的实例。
## 无主可选引用
在 ARC 下，无主可选引用除了可以为 nil 外，其他表现和无主引用一致。

无主引用与弱引用最大的区别在于，无主引用总是假定属性是不为nil的，如果属性所引用的实例被销毁释放了，再次使用这个实例程序就会崩溃。
## 无主可选引用和隐式解包可选值属性
两个属性都必须有值，并且初始化完成后永远不会为 nil。在这种场景中，需要一个类使用无主属性，而另外一个类使用隐式解包可选值属性。
```swift
class Country {
    let name: String
    var capitalCity: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
}

class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
```
Country在构造器中调用City的构造器。然而我们初始化完Country后，Country的构造器才能吧self传给City的构造器（未初始化完就没有`self`），所以我们将capitalCity设为隐式解包可选值类型。这样一来，capitalCity将在调用City构造器前先将自己初始化为nil，随后Country初始化完成，将self传给City构造器；City初始化完成后再赋值给capitalCity，完成Country的初始化。
> 随后调用capitalCity不需要进行可选值解析，将其当作非可选值使用即可。
## 闭包的循环强引用
由于闭包是引用类型，将闭包赋值给类实例的某个属性，并且这个闭包体又使用了这个类实例时，就会产生循环强引用。

我们使用`闭包捕获列表`来解决。
## 闭包捕获列表
在闭包和捕获的实例总是互相引用并且总是同时销毁时，将闭包内的捕获定义为 无主引用。

相反的，在被捕获的引用可能会变为 nil 时，将闭包内的捕获定义为 弱引用。弱引用总是可选类型，并且当引用的实例被销毁后，弱引用的值会自动置为 nil。这使我们可以在闭包体内检查它们是否存在。

如果闭包有参数列表和返回类型，把捕获列表放在它们前面：

```swift
lazy var someClosure = {
    [unowned self, weak delegate = self.delegate]
    (index: Int, stringToProcess: String) -> String in
    // 这里是闭包的函数体
}
```
如果闭包没有指明参数列表或者返回类型，它们会通过上下文推断，那么可以把捕获列表和关键字 in 放在闭包最开始的地方：

```swift
lazy var someClosure = {
    [unowned self, weak delegate = self.delegate] in
    // 这里是闭包的函数体
}
```
同时，只要在闭包内使用self的成员，就要显式使用self.

这提醒你可能会一不小心就捕获了self，造成循环强引用。

# 内存安全
这里是基于单线程的讨论。

swift只允许最多一个对象同时对一个内存空间发起读/写访问。

访问分为顺时访问和长期访问，重叠访问主要出现在使用 in-out 参数的函数和方法或者结构体的 mutating 方法里。
## 属性的访问冲突
如结构体，元组和枚举的类型都是由多个独立的值组成的，例如结构体的属性或元组的元素。因为它们都是值类型，修改值的任何一部分都是对于整个值的修改，意味着其中一个属性的读或写访问都需要访问一整个值。例如，元组元素的写访问重叠会产生冲突：

```swift
var playerInformation = (health: 10, energy: 20)
balance(&playerInformation.health, &playerInformation.energy)
// 错误：playerInformation 的属性访问冲突
```
上面的例子里，传入同一元组的元素对 balance(_:_:) 进行调用，产生了冲突，因为 playerInformation 的访问产生了写访问重叠。playerInformation.health 和 playerInformation.energy 都被作为 in-out 参数传入，意味着 balance(_:_:) 需要在函数调用期间对它们发起写访问。任何情况下，对于元组元素的写访问都需要对整个元组发起写访问。这意味着对于 playerInfomation 发起的两个写访问重叠了，造成冲突。

下面的代码展示了一样的错误，对于一个存储在全局变量里的结构体属性的写访问重叠了。

```swift
var holly = Player(name: "Holly", health: 10, energy: 10)
balance(&holly.health, &holly.energy)  // 错误
```
在实践中，大多数对于结构体属性的访问都会安全的重叠。例如，将上面例子里的变量 holly 改为本地变量而非全局变量，编译器就可以保证这个重叠访问是安全的：

```swift
func someFunction() {
    var oscar = Player(name: "Oscar", health: 10, energy: 10)
    balance(&oscar.health, &oscar.energy)  // 正常
}
```

# 访问控制
## 模块和源文件
Swift 中的访问控制模型基于模块和源文件这两个概念。

模块指的是独立的代码单元，框架或应用程序会作为一个独立的模块来构建和发布。在 Swift 中，一个模块可以使用 import 关键字导入另外一个模块。

在 Swift 中，Xcode 的每个 target（例如框架或应用程序）都被当作独立的模块处理。如果你是为了实现某个通用的功能，或者是为了封装一些常用方法而将代码打包成独立的框架，这个框架就是 Swift 中的一个模块。当它被导入到某个应用程序或者其他框架时，框架的内容都将属于这个独立的模块。

源文件 就是 Swift 模块中的源代码文件（实际上，源文件属于一个应用程序或框架）。尽管我们一般会将不同的类型分别定义在不同的源文件中，但是同一个源文件也可以包含多个类型、函数等的定义。

## 访问级别
Swift 为代码中的实体提供了五种不同的访问级别。这些访问级别不仅与源文件中定义的实体相关，同时也与源文件所属的模块相关。

open 和 public 级别可以让实体被同一模块源文件中的所有实体访问，在模块外也可以通过导入该模块来访问源文件里的所有实体。通常情况下，你会使用 open 或 public 级别来指定框架的外部接口。open 和 public 的区别在后面会提到。

internal 级别让实体被同一模块源文件中的任何实体访问，但是不能被模块外的实体访问。通常情况下，如果某个接口只在应用程序或框架内部使用，就可以将其设置为 internal 级别。

fileprivate 限制实体只能在其定义的文件内部访问。如果功能的部分实现细节只需要在文件内使用时，可以使用 fileprivate 来将其隐藏。

private 限制实体只能在其定义的作用域，以及同一文件内的 extension 访问。如果功能的部分细节只需要在当前作用域内使用时，可以使用 private 来将其隐藏。

open 为最高访问级别（限制最少），private 为最低访问级别（限制最多）。

open 只能作用于类和类的成员，它和 public 的区别主要在于 open 限定的类和成员能够在模块外被继承和重写，在下面的 子类 这一节中有详解。将类的访问级别显式指定为 open 表明你已经设计好了类的代码，并且充分考虑过这个类在其他模块中用作父类时的影响。

## 访问级别基本原则
Swift 中的访问级别遵循一个基本原则：实体不能定义在具有更低访问级别（更严格）的实体中。

例如：

一个 public 的变量，其类型的访问级别不能是 internal，fileprivate 或是 private。因为无法保证变量的类型在使用变量的地方也具有访问权限。

函数的访问级别不能高于它的参数类型和返回类型的访问级别。因为这样就会出现函数可以在任何地方被访问，但是它的参数类型和返回类型却不可以的情况。

# 并发
## Task
Task inherits from origin actor. 这保证了在actor内部方法中使用task，task的任务会在和actor的相同线程内执行，可以访问actor的变量。

但是 Detached Task 不继承actor属性，这意味着它不一定会在与actor相同的线程上执行，并且无法直接访问或修改 actor 的属性。

如果需要在 detached 任务中访问或修改原始 actor 的共享状态，可以使用 await 和 isolation 来确保线程安全和正确性。

## await
await是一个标志点，表明了在await前后，代码不一定会在相同的线程中执行。

因此我们要避免在await中持有锁，也避免在await期间保留线程私有数据。


# 小知识
- swift遍历Set的效率远远高于Array的效率，能遍历Set的不要用Array遍历

```
在 Swift 中，类型可以分为引用类型和值类型两种。
引用类型（Reference Type）是指当你赋值或传递该类型的实例时，实际上是传递了该实例的引用（内存地址）。多个引用可以指向同一个实例，修改一个引用会影响到其他引用。常见的引用类型包括类（Class）、闭包（Closure）和函数（Function）。

值类型（Value Type）是指当你赋值或传递该类型的实例时，实际上是复制了该实例的值。每个实例都有自己的独立内存空间，并且修改一个实例不会影响到其他实例。常见的值类型包括结构体（Struct）、枚举（Enum）和基本数据类型（如整数、浮点数、布尔值等）。

下面是一些常见类型的分类：

引用类型：

类（Class）
闭包（Closure）
函数（Function）

值类型：

结构体（Struct）
枚举（Enum）
基本数据类型（如整数、浮点数、布尔值等）
需要注意的是，Swift 中的字符串（String）类型是一种特殊的值类型，虽然它的底层实现是通过引用来管理字符数据，但是字符串的赋值和传递都是按值进行的，因此它常常被归类为值类型。

总结起来，引用类型是通过引用传递和共享数据的，多个引用可以指向同一个实例。而值类型是通过复制传递和独立拥有数据的，每个实例都有自己的独立内存空间。
```

- 当外层为class时，类型属性、方法、下标可以用class关键字代替static
- 空字符串""是一个有效的非可选类型的字符串，和nil不同
- 你可以将一个继承来的只读属性重写为一个读写属性，反过来却不行。
- 你可以用非可失败构造器和可失败构造器重写可失败构造器，可以用非可失败构造器和隐式解包可失败构造器重写非可失败构造器。

```
在 Swift 编程语言中，关键字 static 和 class 都可以用于定义类的属性（属性包括存储属性和计算属性）和方法（函数），但它们之间有一些重要的区别。

静态属性和方法：

static 关键字可以用于类、结构体和枚举中的属性和方法，用于创建静态（或称为类型）属性和方法。静态属性和方法属于类型本身，而不是类型的实例。
class 关键字只能用于类中的属性和方法，用于创建类属性和类方法。类属性和类方法也属于类型本身，但可以被子类继承和重写。

继承和重写：

static 关键字修饰的属性和方法是静态的，不能被子类继承或重写。它们属于类型本身，无法在子类中进行修改。
class 关键字修饰的属性和方法可以被子类继承和重写。子类可以通过重写类属性和类方法来改变它们的实现。

计算属性和观察器：

static 关键字可以用于定义计算属性和观察器（属性观察器包括 willSet 和 didSet）。
class 关键字可以用于定义计算属性和观察器，但是在子类中重写时，只能重写为计算属性，不能重写为存储属性。
综上所述，static 关键字用于创建静态属性和方法，它们不能被继承或重写。而 class 关键字用于创建类属性和类方法，它们可以被子类继承和重写。请注意，在 Swift 中，结构体和枚举只能使用 static 关键字定义静态属性和方法，不能使用 class 关键字。
```

