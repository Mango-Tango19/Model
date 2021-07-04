# Редактор параметров


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Есть следующие структуры данных, описывающих товар – интерфейс Model и набор параметров этого товара. Необходимо реализовать на React компоненты, которые позволяют редактировать структуру Model – проставлять значения параметров, которые передаются в компонент, а так же позволяют получить полную структуру в методе getModel() – содержащую все проставленные значения параметров. Решение должно быть легко расширяемым (например, позволять легко добавлять новые типы параметров – не только текстовые, но например числовые или со списком значений) Ваша реализация должна работать только с текстовыми параметрами Input – тип string.

Решение необходимо оформить в виде одного файла со всеми компонентами и типами которые используются.


```js 
interface Param {
   id: number;
   name: string;
   type: ‘string’;
}
interface ParamValue {
    paramId: number;
    value: string;
}
interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}
interface Props {
    params: Param[];
    model: Model;
}
class ParamEditor extends React.Component<Props, State> {
    public getModel(): Model {
    }
}
```
