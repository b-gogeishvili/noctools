# Basic

1. What is the difference between protected and internal access modifiers.
2. Memory leaks. What types do you know?
3. Threads synchronization techniques (what we can use) . Blocked, non-blocked
4. Why would you declare a field as volatile?
5. Design pattern: Decorator - short description
6. MS SQL index types. What is the difference

# C#
1. Value type vs reference type
2. Sealed types, Extension methods, virtual, protected
3. Call virtual methods from constructor.
4. Clean code principles. DRY, KISS, YAGNI.
5. Collections (Generics: boxing/unboxing, Hashing algorithms: Hashtable
Dictionary, IQuarable, IEnumerable). Collections internals.
6. Stack & Heap. Garbage collector. Memory leaks
7. Finalize vs Dispose (using sugar, when worth implementing IDisposable?). Dispose pattern
8. Async await best practices
9. Task vs Thread. Multi-threading. Deadlocks
10. EF, linq. When to use Stored Procedures.
11. try, catch, finally. Throw vs throw new vs throw ex.
12. When to use reflection and when not.
13. REST questions (GET, PUT, POST, DELETE) etc., MVC? ASP? WCF?
14. Message queues: RabbitMQ, Azure Service Bus (Dead letter queue?)
15. Cloud: Azure
16. TDD
17. Practical task: Find minimum and maximum value in array. Optimize algorithm if there are more reads or more writes. What data structures we can use? Benefits & drawbacks of each approach. If we want to find average value how we can change the algorithm?
18. Practical task: Collections: Hotels - rooms  - prices for each room. I want to find room for the price range. Return hotels with room prices that are in the selected price range. 
19. Practical task: There is IEnumerable. We should find count for min and max value.
20. Practical task: reverse items in a linked list: https://en.wikipedia.org/wiki/Linked_list
21. Practical task: Create an architecture diagram for a distributed system that delivers real-time stock quotes from quotes provider to end-users.

# Design Patterns

1. Singleton - pros&cons.
2. SOLID principles (D for example)
3. DDD - High level review.
4. Design patterns (Ex: What's the difference between the Dependency Injection and Service Locator patterns?, Template method ?)
5. Microservices. Distributed system best practices. Common patterns: https://microservices.io/patterns/index.html
6. Practical task: Data Transfer Process. The gol: get 1 million user records from remote db; convert to different structure; save to local db. Implementation A takes 4 hours, implementation B takes 4 minutes. Describe possible solution for implementation A & B.

# SQL

1. JOIN types
2. Indexes clustered vs non clustered.
3. Transaction isolation levels.
4. Stored Procedures.
5. Data integrity principles.
6. Temp tables vs table variables.
7. Performance optimization techniques.
8. Practical task: 3 tables: Courses, Students, CoursesStudentsMapping.  select all courses without students. LEFT JOINS
9. Practical task: Hotel rooms - clients who rents rooms. There is ref from clients table to rooms table. Find empty rooms.


---

```c#
public async Task Main() 
{
	
  Console.WriteLine("main1");
	
  DoAsync();
	
  Console.WriteLine("main2");
}



public async Task DoAsync() 
{
	
  Console.WriteLine("proc1");
	
  await Task.Delay(10000);
	
  Console.WriteLine("proc2");

}
```

```c#
using System.Collections.Generic;
public class Processor
{
    // enumerator: 1,3,4,6,9,............,8,5,13,25,3,2
    // lastX: 3
    // result: 25 3 2
    public static void PrintLastX(IEnumerator<int> enumerator, int lastX)
    {
        //enumerator.Current;
        //enumerator.MoveNext();
    }
}
```

```c#
CREATE TABLE Rooms(
  RoomId int,
  Name varchar(50)
)

CREATE TABLE Teachers(
  TeacherId int,
  RoomId int,
  Name varchar(128)
)
```