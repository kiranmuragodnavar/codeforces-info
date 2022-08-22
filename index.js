$(document).ready(function () {
    $("#btn").click(function () {
        async function getdata() {
            const txt = $("#bt").val();
            if (txt == '') {
                alert("Enter a username");
                return;
            }
            const url = "https://codeforces.com/api/user.info?handles=" + txt;
            let response = await fetch(url);
            var data = await response.json();
            if (data.status == 'FAILED') {
                alert("Please enter a valid username")
                return;
            }
            else {
                document.getElementById("firstname").innerHTML = data.result[0].firstName
                document.getElementById("photo").innerHTML = data.result[0].titlePhoto
                document.getElementById("lastname").innerHTML = data.result[0].lastName
                document.getElementById("country").innerHTML = data.result[0].country
                document.getElementById("city").innerHTML = data.result[0].city
                document.getElementById("organization").innerHTML = data.result[0].organization
                document.getElementById("currentrating").innerHTML = data.result[0].rating
                document.getElementById("info-tab").innerHTML = data.result[0].rank + " " + data.result[0].handle
                document.getElementById("friendof").innerHTML = data.result[0].friendOfCount + " Users"
                document.getElementById("photo").src = data.result[0].avatar
                if (data.result[0].rank == "pupil") {
                    document.getElementById("info-tab").style.backgroundColor = "green"
                }
                else if (data.result[0].rank == "newbie") {
                    document.getElementById("info-tab").style.backgroundColor = "grey"
                }
                else if (data.result[0].rank == "specialist") {
                    document.getElementById("info-tab").style.backgroundColor = "cyan"
                }
                else if (data.result[0].rank == "expert") {
                    document.getElementById("info-tab").style.backgroundColor = "blue"
                }
                else if (data.result[0].rating >= 1900 && data.result[0].rating < 2200) {
                    document.getElementById("info-tab").style.backgroundColor = "violet"
                }
                else if (data.result[0].rating >= 2200 && data.result[0].rating < 2400) {
                    document.getElementById("info-tab").style.backgroundColor = "orange"
                }
                else {
                    document.getElementById("info-tab").style.backgroundColor = "red"
                }




                const url2 = "https://codeforces.com/api/user.rating?handle=" + txt;
                let response1 = await fetch(url2);
                let data2 = await response1.json();
                let len = data2.result.length;
                let high_rank = -1, low_rank = 1e10, high_change = -1;
                for (i = 0; i < len; i++) {
                    high_rank = Math.max(high_rank, data2.result[i].rank);
                    low_rank = Math.min(low_rank, data2.result[i].rank);
                    high_change = Math.max(high_change, ~~(data2.result[i].newRating) - ~~(data2.result[i].oldRating));
                }
                document.getElementById("contests").innerHTML = len
                document.getElementById("bestrank").innerHTML = low_rank
                document.getElementById("worstrank").innerHTML = high_rank
                document.getElementById("maxratingchange").innerHTML = high_change
                const url3 = "https://codeforces.com/api/user.status?handle=" + txt;
                let res = await fetch(url3);
                let data3 = await res.json();
                let sub = data3.result.length
                const solved = new Set();
                const unsolved = new Set();
                for (i = 0; i < sub; i++) {
                    if (data3.result[i].verdict == "OK") {
                        solved.add(data3.result[i].problem.contestId + "/" + data3.result[i].problem.index)
                    }
                }
                for (i = 0; i < sub; i++) {
                    if (data3.result[i].verdict != "OK" && !(solved.has(data3.result[i].problem.contestId + "/" + data3.result[i].problem.index))) {
                        unsolved.add(data3.result[i].problem.contestId + "/" + data3.result[i].problem.index);
                    }
                }
                document.getElementById("totalsub").innerHTML = sub
                document.getElementById("accepted").innerHTML = solved.size
                document.getElementById("tried").innerHTML = unsolved.size + solved.size
                var A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0;
                solved.forEach(ele => {
                    if (ele.charAt(ele.length - 1) == "A") {
                        A += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "B") {
                        B += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "C") {
                        C += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "D") {
                        D += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "E") {
                        E += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "F") {
                        F += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "G") {
                        G += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "H") {
                        H += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "I") {
                        I += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "J") {
                        J += 1;
                    }
                    else if (ele.charAt(ele.length - 1) == "K") {
                        K += 1;
                    }
                });
                let table_data = ``;
                let c = 1;
                unsolved.forEach(ele => {

                    if (c % 8 == 1) {

                        table_data += `
                      <tr> <td><a href="https://codeforces.com/problemset/problem/${ele}" style="text-decoration:none" target="_blank">${ele}</td></a>
                      `
                    }
                    else if (c % 8 == 0) {
                        table_data += `                  
                        <td><a href="https://codeforces.com/problemset/problem/${ele}" style="text-decoration:none" target="_blank">${ele}</td></a>
                        </tr>
                        `
                        c = 0;
                    }
                    else {
                        table_data += `
                    
                        <td><a href="https://codeforces.com/problemset/problem/${ele}" style="text-decoration:none" target="_blank">${ele}</td></a>
                        `
                    }
                    c += 1
                });
                document.getElementById("table1").innerHTML = table_data
                var xValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
                var yValues = [A, B, C, D, E, F, G, H];
                var barColors = ["gray", "green", "blue", "orange", "brown", "violet", "red", "black","teal","tan","snow","seagreen","purple","peru","orange","orangered","orchid","olive","navy","lawngreen","khaki","gold","firebrick","cyan","chocolate","brown","silver","burlywood","firebrick","goldenrod","lavender","lightslategray","saddlebrown","wheat"];
                var myChart = document.getElementById("myChart").getContext('2d')
                var chart = new Chart(myChart, {
                    type: "bar",
                    data: {
                        labels: xValues,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues
                        }]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Probelms Solved as per ratings"
                        }
                    }
                })
                var tags = new Map()

                for (i = 0; i < sub; i++) {
                    if (solved.has(data3.result[i].problem.contestId + "/" + data3.result[i].problem.index)) {
                        for (j = 0; j < data3.result[i].problem.tags.length; j++) {
                            if (tags.has(data3.result[i].problem.tags[j])) {
                                tags.set(data3.result[i].problem.tags[j], tags.get(data3.result[i].problem.tags[j]) + 1)
                            }
                            else {
                                tags.set(data3.result[i].problem.tags[j], 1)
                            }
                        }
                        solved.delete(data3.result[i].problem.contestId + "/" + data3.result[i].problem.index)
                    }
                }
                const tags1 = new Map([...tags.entries()].sort((a, b) => b[1] - a[1]));
                var yValues1 = []
                var xValues1 = []
                for(let [x,y] of tags1)
                {
                    xValues1.push(x)
                    yValues1.push(y)
                }
                console.log(xValues1)
                console.log(yValues1)
                var myChart1 = document.getElementById("myChart1").getContext('2d')
                var chart1 = new Chart(myChart1, {
                    type: "pie",
                    data: {
                        labels: xValues1,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues1
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Probelms Solved as per Tags"
                        }
                    }
                });
            }
        }
        getdata();
    });
});