# Timer
Over last couple of chapters, we have used `sleep_ms()` function in different codes. You might have wondered how the &mu;C would have kept track of time. This is commonly done using PWM `CTR` value. By setting a PWM slice to update the `CTR` value at 1MHz rate, this would require the `DIV` value to be 125 for the RP2040 running at 125MHz, we get an accurate 1&mu;s measurement. Note that the `CTR` value in this case directly represents the time passed since it started counting in &mu;s unit. Many microcontrollers have 32-bit `CTR` values. However, since the `CTR` value for RP2040 is 16-bit long, it can measure only 2<sup>16</sup>/1000000 = 0.065536 seconds accurately before `CTR` overflows. This is quite short for applications that require longer time keeping.

To achieve longer time measurement, RP2040 has a 64-bit `CTR` register, as part of the Timer peripheral, that updates at a fixed 1MHz update rate. Thus, with this timer, RP2040 can measure time for 2<sup>64</sup>/1000000 = 18446744073709.551616 seconds &cong; 584942 years with 1&mu;s accuracy. Practically, this timer will never overflow, which is why it is also known as a **Monotonic Timer**. This timer is also the simplest peripheral on RP2040 since all it does is measure time since the &mu;C was started.

Next section provides a list of functions that can be helpful in getting the value of this timer. In my opinion, the library for this peripheral is made unnecessarily complicated since it uses custom datatype, `absolute_time_t`, at different places to represent time instead of `uint64_t`. Moreover, it defines multiple functions that use both `absolute_time_t` and `uint64_t` as arguments, which makes coding quite confusing. So, please pay attention to the function argument type and its usage.
```{tableofcontents}
```