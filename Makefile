CXX = g++
CXXFLAGS = -I include -I src -Wall -Wextra -pedantic -std=c++17
LDFLAGS = -lGL -lm -ldl -lXinerama -lXrandr -lXi -lXcursor -lX11 -lXxf86vm -lpthread

bin := main

debug : CXXFLAGS += -g

static_libs := lib/glad.a lib/libglfw3.a

fls := $(shell find . -name "*.cc")
obj := $(addsuffix .o, $(basename $(fls)))

all: $(obj)
	$(CXX) $(obj) $(static_libs) $(LDFLAGS) -o $(bin)

debug: clean all

clean:
	$(RM) $(obj) $(bin)

.PHONY: all debug clean obj
