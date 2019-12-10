import React from "react";
import {
  Appear,
  CodePane,
  Deck,
  Heading,
  Layout,
  List,
  ListItem,
  Slide,
  // GoToAction,
  SlideSet
} from "spectacle";
import createTheme from "spectacle/lib/themes/default";
import merge from "lodash.merge";
import Arrow from "./Arrow";
import CrazyHeading from "./CrazyHeading";
import "./prism.css";
import SectionText from "./SectionText";

// Require CSS
require("normalize.css");

// eslint-disable-next-line import/no-webpack-loader-syntax
const getExample = type =>
  require(`!raw-loader!./exampleCode/${type}.example`).default;

const themeOverrides = {
  components: {
    heading: {
      h2: {
        padding: '0 0 1rem 0'
      },
      h3: {
        padding: '0 0 1rem 0'
      }
    }
  }
};

const theme = merge(
  createTheme(
    {
      primary: "white",
      secondary: "#1F2022",
      tertiary: "#ff6600",
      quaternary: "#CECECE"
    },
    {
      primary: "Montserrat",
      secondary: "Helvetica",
      script: "Pinyon Script"
    }
  ),
  {
    screen: themeOverrides,
    print: themeOverrides
  }
);
console.log(theme);
export default () => {
  const [sectionText, setSectionText] = React.useState("");
  const onActiveSetText = text => () => setSectionText(text);

  return (
    <>
      <img
        src="favicon.ico"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
          padding: "1.5rem"
        }}
      />
      <SectionText>{sectionText}</SectionText>
      <Deck transition={["slide"]} transitionDuration={250} theme={theme}>
        <SlideSet id="intro">
          <Slide
            transition={["zoom"]}
            bgColor="primary"
            onActive={onActiveSetText()}
          >
            <Heading
              size={1}
              fit
              lineHeight={1}
              textColor="secondary"
              textFont="script"
            >
              Introduction to Typescript
            </Heading>
            <img
              src="lulz.jpg"
              alt=""
              style={{ position: "absolute", bottom: 0, left: 0 }}
            />
          </Slide>
          {/* TODO - Add this in for the published deck */}
          {/* <Slide bgColor="black" textColor="white">
            <Heading size={3} textColor="red">
              WARNING:
            </Heading>
            <p>
              The next slide may potentially trigger seizures for people with
              photosensitive epilepsy.
            </p>
            <p>Viewer discretion is advised</p>
            <GoToAction slide={4} bgColor="white" textColor="black">
              Click here to skip the next slide
            </GoToAction>
          </Slide> */}
          <Slide
            bgImage="darkmodeparrot.gif"
            bgColor="black"
            bgSize="fit"
            onActive={onActiveSetText()}
          >
            <CrazyHeading>INTRODUCTION TO TYPESCRIPT!!1!</CrazyHeading>
          </Slide>
          <Slide onActive={onActiveSetText()}>
            <Heading size={2}>Agenda</Heading>
            <Layout style={{ justifyContent: "center" }}>
              <List>
                <ListItem>Basic Types</ListItem>
                <ListItem>Interfaces</ListItem>
                <ListItem>Classes</ListItem>
                <ListItem>Generics</ListItem>
                <ListItem>Enums</ListItem>
                {/* <ListItem>Advanced Types</ListItem> */}
              </List>
            </Layout>
          </Slide>
          <Slide onActive={onActiveSetText()}>
            <img
              src="tea.png"
              alt=""
              style={{
                position: "absolute",
                bottom: 0,
                right: 30,
                transform: "scaleX(-1)"
              }}
            />
            <Heading size={2}>What is Typescript?</Heading>
            <Appear>
              <p>
                TypeScript is a typed superset of JavaScript that compiles to
                plain JavaScript
              </p>
            </Appear>
          </Slide>
          <Slide onActive={onActiveSetText()}>
            <img
              src="tea.png"
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 30,
                transform: "scaleX(-1) rotate(180deg)"
              }}
            />
            <Heading size={2}>How do I Typescript?</Heading>
            <Appear>
              <p>That's what we are here to talk about.</p>
            </Appear>
          </Slide>
        </SlideSet>
        <SlideSet id="basic-types">
          <Slide onActive={onActiveSetText("")}>
            <Heading size={2}>Basic Types</Heading>
          </Slide>
          <Slide
            notes={<p>simple true/false value</p>}
            onActive={onActiveSetText("Basic Types")}
          >
            <Heading size={3}>boolean</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/boolean")}
            />
          </Slide>
          <Slide
            notes={
              <p>
                TypeScript supports hexadecimal, decimal, binary and octal
                literals under the number type.
              </p>
            }
            onActive={onActiveSetText("Basic Types")}
          >
            <Heading size={3}>number</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/number")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <p>
                Just like JavaScript, TypeScript also uses double quotes (") or
                single quotes (') to surround string data.
              </p>
            }
          >
            <Heading size={3}>string</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/string")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <p>
                Array types can be written in one of two ways. In the first, you
                use the type of the elements followed by [] to denote an array
                of that element type or you can use a generic array type by
                using
                {` Array<T>`}
              </p>
            }
          >
            <Heading size={3}>Array</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/array")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <p>
                Tuple types allow you to express an array with a fixed number of
                elements whose types are known, but need not be the same.
              </p>
            }
          >
            <Heading size={3}>Tuple</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/tuple")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <>
                <p>
                  Enums are a way of giving more friendly names to sets of
                  numerical or textual values.
                </p>
                <p>We will talk more about enums later in the presentation.</p>
              </>
            }
          >
            <Heading size={3}>enum</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/enum")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <>
                <p>
                  We may need to describe the type of variables that we do not
                  know when we are writing an application.
                </p>
                <p>
                  These values may come from dynamic content, e.g. from the user
                  or a 3rd party library.
                </p>
                <p>
                  In these cases, we want to opt-out of type checking and let
                  the values pass through compile-time checks. To do so, we
                  label these with the any type.
                </p>
              </>
            }
          >
            <Heading size={3}>any</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/any")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <>
                <p>
                  void is a little like the opposite of any: the absence of
                  having any type at all.
                </p>
                <p>
                  You may commonly see this as the return type of functions that
                  do not return a value: Declaring variables of type void is not
                  useful because you can only assign null (only if
                  --strictNullChecks is not specified, see next section) or
                  undefined to them:
                </p>
              </>
            }
          >
            <Heading size={3}>void</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/void")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <>
                <p>
                  In TypeScript, both undefined and null actually have their own
                  types named undefined and null respectively.
                </p>
                <p>
                  Much like void, they’re not extremely useful on their own:
                </p>
              </>
            }
          >
            <Heading size={3}>null and undefined</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/nullAndUndefined")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <>
                <p>
                  The never type represents the type of values that never occur.
                </p>
                <p>
                  For instance, never is the return type for a function
                  expression or an arrow function expression that always throws
                  an exception or one that never returns.
                </p>
                <p>
                  The never type is a subtype of, and assignable to, every type;
                  however, no type is a subtype of, or assignable to, never
                  (except never itself). Even any isn’t assignable to never.
                </p>
              </>
            }
          >
            <Heading size={3}>never</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/never")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Basic Types")}
            notes={
              <>
                <p>
                  object is a type that represents the non-primitive type, i.e.
                  anything that is not number, string, boolean, bigint, symbol,
                  null, or undefined.
                </p>
                <p>
                  With object type, APIs like Object.create can be better
                  represented.
                </p>
              </>
            }
          >
            <Heading size={3}>object</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("basicTypes/object")}
            />
          </Slide>
        </SlideSet>
        <SlideSet id="functions">
          <Slide
            onActive={onActiveSetText()}
            notes={
              <p>
                To begin, just as in JavaScript, TypeScript functions can be
                created both as a named function or as an anonymous function
              </p>
            }
          >
            <Heading size={2}>Functions</Heading>
          </Slide>
          <Slide
            onActive={onActiveSetText("Functions")}
            notes={
              <>
                <p>
                  We can add types to each of the parameters and then to the
                  function itself to add a return type.
                </p>
                <p>
                  TypeScript can usually figure the return type out by looking
                  at the return statements, so we can also optionally leave this
                  off in many cases.
                </p>
              </>
            }
          >
            <Heading size={3}>Function Types</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("functions/functionTypes")}
            />
          </Slide>
        </SlideSet>
        <SlideSet id="interfaces">
          <Slide
            onActive={onActiveSetText()}
            notes={
              <>
                <p>
                  One of TypeScript’s core principles is that type checking
                  focuses on the shape that values have.
                </p>
                <p>
                  This is sometimes called “duck typing” or “structural
                  subtyping”. If it looks like a duck and sounds like a duck,
                  its a duck.
                </p>
                <p>
                  In TypeScript, interfaces fill the role of naming these types,
                  and are a powerful way of defining contracts within your code
                  as well as contracts with code outside of your project.
                </p>
              </>
            }
          >
            <Heading size={2}>Interfaces</Heading>
          </Slide>
          <Slide
            align="center flex-start"
            padding="130px 0 0 0"
            onActive={onActiveSetText("Interfaces")}
            notes={
              <>
                <p>
                  The type checker checks the call to printLabel. The printLabel
                  function has a single parameter that requires that the object
                  passed in has a property called label of type string.
                </p>
                <p>
                  We can write the same example again, this time using an
                  interface to describe the requirement of having the label
                  property that is a string. [NEXT SLIDE]
                </p>
                <p>
                  The interface LabeledValue is a name we can now use to
                  describe the requirement in the previous example. It still
                  represents having a single property called label that is of
                  type string.
                </p>
                <p>
                  Notice we didn’t have to explicitly say that the object we
                  pass to printLabel implements this interface like we might
                  have to in other languages. Here, it’s only the shape that
                  matters. If the object we pass to the function meets the
                  requirements listed, then it’s allowed.
                </p>
                <p>
                  It’s worth pointing out that the type checker does not require
                  that these properties come in any sort of order, only that the
                  properties the interface requires are present and have the
                  required type.
                </p>
              </>
            }
          >
            <Heading size={3}>Our First Interface</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("interfaces/ourFirstInterface")}
            />
            <Appear>
              <div>
                <Arrow />
                <CodePane
                  theme="external"
                  lang="javascript"
                  source={getExample("interfaces/ourFirstInterface2")}
                />
              </div>
            </Appear>
          </Slide>
          <Slide
            onActive={onActiveSetText("Interfaces")}
            notes={
              <>
                <p>Not all properties of an interface may be required.</p>
                <p>
                  Appending a "?" to a property in an inferace denotes that the
                  property may or may not be defined and it does not need to be
                  defined for an object to adhere to the interface contract.
                </p>
              </>
            }
          >
            <Heading size={3}>Optional Properties</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("interfaces/optionalProperties")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Interfaces")}
            notes={
              <>
                <p>
                  Interfaces are capable of describing the wide range of shapes
                  that JavaScript objects can take. In addition to describing an
                  object with properties, interfaces are also capable of
                  describing function types.
                </p>
                <p>
                  To describe a function type with an interface, we give the
                  interface a call signature. This is like a function
                  declaration with only the parameter list and return type
                  given. Each parameter in the parameter list requires both name
                  and type.
                </p>
                <p>
                  Once defined, we can use this function type interface like we
                  would other interfaces. For function types to correctly type
                  check, the names of the parameters do not need to match.
                  Function parameters are checked one at a time, with the type
                  in each corresponding parameter position checked against each
                  other.
                </p>
              </>
            }
          >
            <Heading size={3}>Interface Function Types</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("interfaces/functionTypes")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Interfaces")}
            notes={
              <>
                <p>
                  One of the most common uses of interfaces in languages like C#
                  and Java, that of explicitly enforcing that a class meets a
                  particular contract, is also possible in TypeScript.
                </p>
                <p>
                  You can also describe methods in an interface that are
                  implemented in the class.
                </p>
              </>
            }
          >
            <Heading size={3}>Class Types</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("interfaces/classTypes")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Interfaces")}
            notes={
              <>
                <p>Like classes, interfaces can extend each other.</p>
                <p>
                  This allows you to copy the members of one interface into
                  another, which gives you more flexibility in how you separate
                  your interfaces into reusable components.
                </p>
              </>
            }
          >
            <Heading size={3}>Extending Interfaces</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("interfaces/extendingInterfaces")}
            />
          </Slide>
        </SlideSet>
        <SlideSet id="classes">
          <Slide
            onActive={onActiveSetText()}
            notes={
              <>
                <p>
                  Traditional JavaScript uses functions and prototype-based
                  inheritance to build up reusable components, but this may feel
                  a bit awkward to programmers more comfortable with an
                  object-oriented approach, where classes inherit functionality
                  and objects are built from these classes.
                </p>
                <p>
                  Starting with ECMAScript 2015, also known as ECMAScript 6,
                  JavaScript programmers will be able to build their
                  applications using this object-oriented class-based approach.
                </p>
                <p>
                  In TypeScript, we allow developers to use these techniques
                  now, and compile them down to JavaScript that works across all
                  major browsers and platforms, without having to wait for the
                  next version of JavaScript.
                </p>
              </>
            }
          >
            <Heading size={2}>Classes</Heading>
          </Slide>
          <Slide
            onActive={onActiveSetText("Classes")}
            notes={
              <>
                <p>
                  The syntax should look familiar if you’ve used C# or Java
                  before. We declare a new class Greeter. This class has three
                  members: a property called greeting, a constructor, and a
                  method greet.
                </p>
                <p>
                  You’ll notice that in the class when we refer to one of the
                  members of the class we prepend "this.". This denotes that
                  it’s a member access.
                </p>
                <p>
                  In the last few lines we construct an instance of the Greeter
                  class using new. This calls into the constructor we defined
                  earlier, creating a new object with the Greeter shape, and
                  running the constructor to initialize it.
                </p>
              </>
            }
          >
            <Heading size={3}>Class Example</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("classes/class")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Classes")}
            notes={
              <>
                <p>
                  This example shows the most basic inheritance feature: classes
                  inherit properties and methods from base classes.
                </p>
                <p>
                  Here, Dog is a derived class that derives from the Animal base
                  class using the extends keyword. Derived classes are often
                  called subclasses, and base classes are often called
                  superclasses.
                </p>
                <p>
                  Because Dog extends the functionality from Animal, we were
                  able to create an instance of Dog that could both bark() and
                  move().
                </p>
              </>
            }
          >
            <Heading size={3}>Inheritance</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("classes/inheritance")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Classes")}
            notes={
              <>
                <p>In TypeScript, each member is public by default.</p>
                <p>
                  When a member is marked private, it cannot be accessed from
                  outside of its containing class
                </p>
                <p>
                  The protected modifier acts much like the private modifier
                  with the exception that members declared protected can also be
                  accessed within deriving classes
                </p>
              </>
            }
          >
            <Heading size={3}>Access Modifiers</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("classes/accessModifiers")}
            />
          </Slide>
        </SlideSet>
        <SlideSet id="generics">
          <Slide
            onActive={onActiveSetText()}
            notes={
              <>
                <p>
                  In languages like C# and Java, one of the main tools in the
                  toolbox for creating reusable components is generics, that is,
                  being able to create a component that can work over a variety
                  of types rather than a single one.
                </p>
                <p>
                  This allows users to consume these components and use their
                  own types.
                </p>
              </>
            }
          >
            <Heading size={2}>Generics</Heading>
          </Slide>
          <Slide
            onActive={onActiveSetText("Generics")}
            notes={
              <>
                <p>
                  Take, for example, the identity function which, given an
                  input, simply returns the input.
                </p>
                <p>
                  Without generics, we would either have to give the identity
                  function a specific type Or, we could describe the identity
                  function using the `any` type.
                </p>
                <p>
                  While using any is certainly generic in that it will cause the
                  function to accept any and all types for the type of arg, we
                  actually are losing the information about what that type was
                  when the function returns. If we passed in a number, the only
                  information we have is that any type could be returned.
                </p>
                <p>
                  Instead, we need a way of capturing the type of the argument
                  in such a way that we can also use it to denote what is being
                  returned. Here, we will use a type variable, a special kind of
                  variable that works on types rather than values.
                </p>
                <p>
                  We’ve now added a type variable T to the identity function.
                  This T allows us to capture the type the user provides (e.g.
                  number), so that we can use that information later
                </p>
              </>
            }
          >
            <Heading size={3}>Generics Hello World</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("generics/generics")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Generics")}
            notes={
              <>
                <p>
                  We may want to move the generic parameter to be a parameter of
                  the whole interface.
                </p>
                <p>
                  This lets us see what type(s) we’re generic over (e.g.{" "}
                  {`Dictionary<string>`} rather than just Dictionary).
                </p>
                <p>
                  This makes the type parameter visible to all the other members
                  of the interface.
                </p>
              </>
            }
          >
            <Heading size={3}>Generic Interface</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("generics/genericInterface")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Generics")}
            notes={
              <>
                <p>
                  A generic class has a similar shape to a generic interface.
                </p>
                <p>
                  Generic classes have a generic type parameter list in angle
                  brackets ({`<>`}) following the name of the class.
                </p>
              </>
            }
          >
            <Heading size={3}>Generic Class</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("generics/genericClass")}
            />
          </Slide>
        </SlideSet>
        <SlideSet id="enums">
          <Slide
            onActive={onActiveSetText()}
            notes={
              <>
                <p>Enums allow us to define a set of named constants.</p>
                <p>
                  Using enums can make it easier to document intent, or create a
                  set of distinct cases.
                </p>
                <p>TypeScript provides both numeric and string-based enums.</p>
              </>
            }
          >
            <Heading size={2}>Enums</Heading>
          </Slide>
          <Slide
            onActive={onActiveSetText("Enums")}
            notes={
              <>
                <p>Numeric enums are enums the use numbers for values</p>
                <p>
                  Here we have a numeric enum where Up is initialized with 1.
                  All of the following members are auto-incremented from that
                  point on. In other words, Direction.Up has the value 1, Down
                  has 2, Left has 3, and Right has 4.
                </p>
                <p>
                  If we wanted, we could leave off the initializers entirely. In
                  this example, Up would have the value 0, Down would have 1,
                  etc.
                </p>
                <p>
                  This auto-incrementing behavior is useful for cases where we
                  might not care about the member values themselves, but do care
                  that each value is distinct from other values in the same
                  enum.
                </p>
              </>
            }
          >
            <Heading size={3}>Numeric Enum</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("enums/numericEnum")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Enums")}
            notes={
              <>
                <p>String enums are enums that use strings as values.</p>
                <p>
                  String enums are similar to numeric enums but have some subtle
                  runtime differences.
                </p>
                <p>
                  In a string enum, each member has to be constant-initialized
                  with a string literal, or with another string enum member.
                </p>
                <p>
                  While string enums don’t have auto-incrementing behavior,
                  string enums have the benefit that they “serialize” well.
                </p>
                <p>
                  In other words, string enums allow you to give a meaningful
                  and readable value when your code runs, independent of the
                  name of the enum member itself
                </p>
              </>
            }
          >
            <Heading size={3}>String Enums</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("enums/stringEnum")}
            />
          </Slide>
          <Slide
            onActive={onActiveSetText("Enums")}
            notes={
              <>
                <p>
                  Using an enum is simple: just access any member as a property
                  off of the enum itself, and declare types using the name of
                  the enum:
                </p>
              </>
            }
          >
            <Heading size={3}>Using Enums</Heading>
            <CodePane
              theme="external"
              lang="javascript"
              source={getExample("enums/usingEnums")}
            />
          </Slide>
        </SlideSet>
        <Slide onActive={onActiveSetText()}>
          <Heading size={2}>Play Time!</Heading>
          <a href="http://www.typescriptlang.org/play/">
            Typescript Playground
          </a>
        </Slide>
        <SlideSet id="closing">
          <Slide onActive={onActiveSetText()}>
            <Heading size={2}>Resources</Heading>
            <a href="https://www.typescriptlang.org/docs/handbook/basic-types.html">
              Typescript Handbook
            </a>
          </Slide>
          <Slide onActive={onActiveSetText()}>
            <Heading size={2}>Questions?</Heading>
          </Slide>
          <Slide onActive={onActiveSetText()}>
            <Heading>Thanks!</Heading>
            <img
              src="fastparrot.gif"
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: "rotate(90deg)",
                width: 150
              }}
            />
          </Slide>
        </SlideSet>
      </Deck>
    </>
  );
};
