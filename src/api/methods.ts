// A mock function to mimic making an async request for data

export const url = "https://backend-test.data-vault.vretail.space";
export const fetchFilterData = async (params = "") => {
  const response = await fetch(`${url}/${params}`, {
    method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount }),
  });
  const result: { data: any } = await response.json();

  return result;
};

export const patchFilterData = async (params = "", body: any) => {
  const response = await fetch(`${url}/${params}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  const result: { data: any } = await response.json();
  return result;
};

export const postFilterData = async (params = "", body: any) => {
  const response = await fetch(`${url}/${params}`, {
    headers: { "Content-Type": "application/json" },

    method: "POST",
    body: JSON.stringify(body),
  });

  const result: { data: any } = await response.json();
  return result;
};
