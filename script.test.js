const f = require('./posts_and_users');

test('The api returns array of posts', () => {
return f.get_posts().then(data => {
    expect(data).toBeInstanceOf(Array);
  });
});


test('The api returns array of users', () => {
    return f.get_users().then(data => {
        expect(data).toBeInstanceOf(Array);
      });
    });

test('Change deegres to radians', () => {
    expect(f.radians(90).toFixed(2)).toBe('1.57');
  });


test('Calculate distance beetwen two points properly', () => {
  const lat1 = 20, lng1 = -20, lat2 = 50, lng2 = 70;
  expect(f.calculate_distance(lat1,lng1,lat2,lng2).toFixed(0)).toBe("8321");
});


it("Counts user's posts properly", () => {
    console.log = jest.fn();
    const users = [{
        name:"John",
        posts:[
            {title:"Post 1"},
            {title:"Post 2"},
            {title:"Post 3"},
        ]
    }];
    f.count_users_posts(users);
    expect(console.log).toHaveBeenCalledWith('John napisał(a) 3 postów');
  });

it("Finds repeated posts", () => {
    console.log = jest.fn();
    const posts = [
            {title:"Post 1"},
            {title:"Post 2"},
            {title:"Post 3"},
            {title:"Post 3"},
            {title:"Post 4"},
            {title:"Post 4"},
            {title:"Post 5"},
    ];
    f.find_non_unique_posts(posts);
    expect(console.log).toHaveBeenCalledWith(['Post 3', 'Post 4']);
});

it("Logs correct distances", () => {
    console.log = jest.fn();
    const users = [{
            name:"John",
            address:{
                geo: {
                    lat: -37.3159,
                    lng: 81.1496
                }
            }
            
        },
        {
            name:"James",
            address: {
                geo: {
                    lat: -43.9509,
                    lng: -34.4618
                    }
            }
            
            },
        {
            name:"Jacob",
            address:{
                geo: {
                    lat: -68.6102,
                    lng: -47.0653
                    }
            }
            },
    ];
    f.find_closests_users(users);
    expect(console.log).toHaveBeenCalledWith("John - najbliższy użytkownik: Jacob (7492 km)");
    expect(console.log).toHaveBeenCalledWith("James - najbliższy użytkownik: Jacob (2838 km)");
    expect(console.log).toHaveBeenCalledWith("Jacob - najbliższy użytkownik: James (2838 km)");
});

